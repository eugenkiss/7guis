/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var fs = require('fs');
var ConcatSource = require("webpack-sources").ConcatSource;
var CachedSource = require("webpack-sources").CachedSource;
var async = require("async");
var ExtractedModule = require("./ExtractedModule");
var Chunk = require("webpack/lib/Chunk");
var OrderUndefinedError = require("./OrderUndefinedError");
var loaderUtils = require("loader-utils");
var schemaTester = require('./schema/validator');
var loaderSchema = require('./schema/loader-schema');
var pluginSchema = require('./schema/plugin-schema.json');

var NS = fs.realpathSync(__dirname);
var nextId = 0;

function ExtractTextPluginCompilation() {
	this.modulesByIdentifier = {};
}

ExtractTextPluginCompilation.prototype.addModule = function(identifier, originalModule, source, additionalInformation, sourceMap, prevModules) {
	var m;
	if(!this.modulesByIdentifier[identifier]) {
		m = this.modulesByIdentifier[identifier] = new ExtractedModule(identifier, originalModule, source, sourceMap, additionalInformation, prevModules);
	} else {
		m = this.modulesByIdentifier[identifier];
		m.addPrevModules(prevModules);
		if(originalModule.index2 < m.getOriginalModule().index2) {
			m.setOriginalModule(originalModule);
		}
	}
	return m;
};

ExtractTextPluginCompilation.prototype.addResultToChunk = function(identifier, result, originalModule, extractedChunk) {
	if(!Array.isArray(result)) {
		result = [[identifier, result]];
	}
	var counterMap = {};
	var prevModules = [];
	result.forEach(function(item) {
		var c = counterMap[item[0]];
		var module = this.addModule.call(this, item[0] + (c || ""), originalModule, item[1], item[2], item[3], prevModules.slice());
		extractedChunk.addModule(module);
		module.addChunk(extractedChunk);
		counterMap[item[0]] = (c || 0) + 1;
		prevModules.push(module);
	}, this);
};

ExtractTextPlugin.prototype.renderExtractedChunk = function(chunk) {
	var that   = this;
	var source = new ConcatSource();

	forEachChunkModule( chunk, function ( module ) {
		var moduleSource = module.source();

		source.add( that.applyAdditionalInformation( moduleSource, module.additionalInformation ) );
	} );

	return source;
};

function isInvalidOrder(a, b) {
	var bBeforeA = a.getPrevModules().indexOf(b) >= 0;
	var aBeforeB = b.getPrevModules().indexOf(a) >= 0;
	return aBeforeB && bBeforeA;
}

function getOrder(a, b) {
	var aOrder = a.getOrder();
	var bOrder = b.getOrder();
	if(aOrder < bOrder) return -1;
	if(aOrder > bOrder) return 1;
	var aIndex = a.getOriginalModule().index2;
	var bIndex = b.getOriginalModule().index2;
	if(aIndex < bIndex) return -1;
	if(aIndex > bIndex) return 1;
	var bBeforeA = a.getPrevModules().indexOf(b) >= 0;
	var aBeforeB = b.getPrevModules().indexOf(a) >= 0;
	if(aBeforeB && !bBeforeA) return -1;
	if(!aBeforeB && bBeforeA) return 1;
	var ai = a.identifier();
	var bi = b.identifier();
	if(ai < bi) return -1;
	if(ai > bi) return 1;
	return 0;
}

function ExtractTextPlugin(options) {
	options = options || {}

	if(arguments.length > 1) {
		throw new Error("Breaking change: ExtractTextPlugin now only takes a single argument. Either an options " +
						"object *or* the name of the result file.\n" +
						"Example: if your old code looked like this:\n" +
						"    new ExtractTextPlugin('css/[name].css', { disable: false, allChunks: true })\n\n" +
						"You would change it to:\n" +
						"    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })\n\n" +
						"The available options are:\n" +
						"    filename: string\n" +
						"    allChunks: boolean\n" +
						"    disable: boolean\n");
	}
	if(isString(options)) {
		options = { filename: options };
	} else {
		schemaTester(pluginSchema, options);
	}
	this.filename = options.filename || (process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css');
	this.id = options.id != null ? options.id : ++nextId;
	this.options = {};
	mergeOptions(this.options, options);
	delete this.options.filename;
	delete this.options.id;
}
module.exports = ExtractTextPlugin;

function getLoaderObject(loader) {
	if (isString(loader)) {
		return {loader: loader};
	}
	return loader;
}

function mergeOptions(a, b) {
	if(!b) return a;
	Object.keys(b).forEach(function(key) {
		a[key] = b[key];
	});
	return a;
}

function isString(a) {
	return typeof a === "string";
}

function isFunction(a) {
	return isType('Function', a);
}

function isType(type, obj) {
	return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

ExtractTextPlugin.loader = function(options) {
	return { loader: require.resolve("./loader"), options: options };
};

ExtractTextPlugin.prototype.applyAdditionalInformation = function(source, info) {
	if(info) {
		return new ConcatSource(
			"@media " + info[0] + " {",
			source,
			"}"
		);
	}
	return source;
};

ExtractTextPlugin.prototype.loader = function(options) {
	return ExtractTextPlugin.loader(mergeOptions({id: this.id}, options));
};

ExtractTextPlugin.prototype.extract = function(options) {
	if(arguments.length > 1) {
		throw new Error("Breaking change: extract now only takes a single argument. Either an options " +
						"object *or* the loader(s).\n" +
						"Example: if your old code looked like this:\n" +
						"    ExtractTextPlugin.extract('style-loader', 'css-loader')\n\n" +
						"You would change it to:\n" +
						"    ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })\n\n" +
						"The available options are:\n" +
						"    use: string | object | loader[]\n" +
						"    fallback: string | object | loader[]\n" +
						"    publicPath: string\n");
	}
	if(options.fallbackLoader) {
		console.warn('fallbackLoader option has been deprecated - replace with "fallback"');
	}
	if(options.loader) {
		console.warn('loader option has been deprecated - replace with "use"');
	}
	if(Array.isArray(options) || isString(options) || typeof options.options === "object" || typeof options.query === 'object') {
		options = { loader: options };
	} else {
		schemaTester(loaderSchema, options);
	}
	var loader = options.use ||  options.loader;
	var before = options.fallback || options.fallbackLoader || [];
	if(isString(loader)) {
		loader = loader.split("!");
	}
	if(isString(before)) {
		before = before.split("!");
	} else if(!Array.isArray(before)) {
		before = [before];
	}
	options = mergeOptions({omit: before.length, remove: true}, options);
	delete options.loader;
	delete options.use;
	delete options.fallback;
	delete options.fallbackLoader;
	return [this.loader(options)]
		.concat(before, loader)
		.map(getLoaderObject);
}

ExtractTextPlugin.extract = ExtractTextPlugin.prototype.extract.bind(ExtractTextPlugin);

ExtractTextPlugin.prototype.apply = function(compiler) {
	var options = this.options;
	compiler.plugin("this-compilation", function(compilation) {
		var extractCompilation = new ExtractTextPluginCompilation();
		compilation.plugin("normal-module-loader", function(loaderContext, module) {
			loaderContext[NS] = function(content, opt) {
				if(options.disable)
					return false;
				if(!Array.isArray(content) && content != null)
					throw new Error("Exported value was not extracted as an array: " + JSON.stringify(content));
				module[NS] = {
					content: content,
					options: opt || {}
				};
				return options.allChunks || module[NS + "/extract"]; // eslint-disable-line no-path-concat
			};
		});
		var filename = this.filename;
		var id = this.id;
		var extractedChunks, entryChunks, initialChunks;
		compilation.plugin("optimize-tree", function(chunks, modules, callback) {
			extractedChunks = chunks.map(function() {
				return new Chunk();
			});
			chunks.forEach(function(chunk, i) {
				var extractedChunk = extractedChunks[i];
				extractedChunk.index = i;
				extractedChunk.originalChunk = chunk;
				extractedChunk.name = chunk.name;
				extractedChunk.entrypoints = chunk.entrypoints;
				chunk.chunks.forEach(function(c) {
					extractedChunk.addChunk(extractedChunks[chunks.indexOf(c)]);
				});
				chunk.parents.forEach(function(c) {
					extractedChunk.addParent(extractedChunks[chunks.indexOf(c)]);
				});
			});
			async.forEach(chunks, function(chunk, callback) {
				var extractedChunk = extractedChunks[chunks.indexOf(chunk)];

				// SETTING THIS TO TRUE INSURES ALL CHUNKS ARE HANDLED:
				var shouldExtract = true; //!!(options.allChunks || chunk.isInitial());

				chunk.sortModules();
				async.forEach(getChunkModulesArray(chunk), function(module, callback) {
					var meta = module[NS];
					if(meta && (!meta.options.id || meta.options.id === id)) {
						var wasExtracted = Array.isArray(meta.content);
						if(shouldExtract !== wasExtracted) {
							module[NS + "/extract"] = shouldExtract; // eslint-disable-line no-path-concat
							compilation.rebuildModule(module, function(err) {
								if(err) {
									compilation.errors.push(err);
									return callback();
								}
								meta = module[NS];
								if(!Array.isArray(meta.content) && meta.content != null) {
									err = new Error(module.identifier() + " doesn't export content");
									compilation.errors.push(err);
									return callback();
								}
								if(meta.content)
									extractCompilation.addResultToChunk(module.identifier(), meta.content, module, extractedChunk);
								callback();
							});
						} else {
							if(meta.content)
								extractCompilation.addResultToChunk(module.identifier(), meta.content, module, extractedChunk);
							callback();
						}
					} else callback();
				}, function(err) {
					if(err) return callback(err);
					callback();
				});
			}, function(err) {
				if(err) return callback(err);
				compilation.applyPlugins("optimize-extracted-chunks", extractedChunks);
				callback();
			}.bind(this));
		}.bind(this));

		// HMR: inject file name into corresponding javascript modules in order to trigger
		// appropriate hot module reloading of CSS
		if (process.env.NODE_ENV === 'development') {
			compilation.plugin("before-chunk-assets", function() {
				extractedChunks.forEach(function(extractedChunk) {
					forEachChunkModule(extractedChunk, function(module) {
						if(module.__fileInjected) return;
						module.__fileInjected = true;

						var originalModule = module.getOriginalModule();
						var file = getFile(compilation, filename, module, extractedChunk.originalChunk);
						originalModule._source._value = originalModule._source._value.replace('%%extracted-file%%', file);
					});
				});
			});
		}

		// add the css files to assets and the files array corresponding to its chunks
		compilation.plugin("additional-assets", function(callback) {
			extractedChunks.forEach(function(extractedChunk) {
				if (extractedChunk.getNumberOfModules()) {
					extractedChunk.sortModules((a, b) => {
						if (!options.ignoreOrder && isInvalidOrder(a, b)) {
							compilation.errors.push(new OrderUndefinedError(a.getOriginalModule()));
							compilation.errors.push(new OrderUndefinedError(b.getOriginalModule()));
						}
						return getOrder(a, b);
					});

					var stylesheet = this.renderExtractedChunk(extractedChunk);
					var chunk = extractedChunk.originalChunk;
					var file = getFile(compilation, filename, stylesheet, chunk);

					compilation.assets[file] = stylesheet;
					chunk.files.push(file);
				}
			}, this);
			callback();
		}.bind(this));

	}.bind(this));
};


function getFile(compilation, filename, module, chunk) {
	return typeof filename === 'function'
		? filename(getPath(compilation, module.source(), chunk))
		: getPath(compilation, module.source(), chunk)(filename)
}

function getPath(compilation, source, chunk) {
	return function(format) {
		return compilation.getPath(format, {
			chunk: chunk
		}).replace(/\[(?:(\w+):)?contenthash(?::([a-z]+\d*))?(?::(\d+))?\]/ig, function() {
			var sourceValue = source && source._value || source; // catch a small bug during development when using [contenthash]
			return loaderUtils.getHashDigest(sourceValue, arguments[1], arguments[2], parseInt(arguments[3], 10));
		});
	}
}

function isChunk(chunk, error) {
	if (!(chunk instanceof Chunk)) {
		throw new Error(typeof error === 'string' ? error : 'chunk is not an instance of Chunk');
	}

	return true;
}

function forEachChunkModule(chunk, cb) {
	isChunk(chunk);

	// webpack >= 3.x.x
	if (typeof chunk.forEachModule === 'function') {
		chunk.forEachModule(cb);
	}
	else {
		// webpack < 3.x.x
		chunk.modules.forEach(cb);
	}

	// Nothing better to return...
	return chunk;
}

function getChunkModulesArray(chunk) {
	isChunk(chunk);

	var arr = [];

	// webpack >= 3.x.x
	if ( typeof chunk.mapModules === 'function' ) {
		arr = chunk.mapModules();
	}
	else {
		// webpack < 3.x.x
		arr = chunk.modules.slice();
	}

	return arr;
}
