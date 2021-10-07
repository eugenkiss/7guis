'use strict';

/* eslint-disable no-console */

if (process.env.NODE_ENV === 'development') {
	var preact = require('preact');
	var options = preact.options;
	var oldVnodeOption = options.vnode;

	options.vnode = function (vnode) {
		var nodeName = vnode.nodeName,
		    attributes = vnode.attributes,
		    children = vnode.children;


		if (nodeName === void 0) {
			console.error('Undefined component passed to preact.h()\n' + serializeVNode(vnode));
		}

		if (attributes && attributes.ref !== void 0 && typeof attributes.ref !== 'function' && !('$$typeof' in vnode) // allow string refs when preact-compat is installed
		) {
				throw new Error('Component\'s "ref" property should be a function,' + (' but [' + typeof attributes.ref + '] passed\n') + serializeVNode(vnode));
			}

		{
			var keys = {};

			inspectChildren(children, function (deepChild) {
				if (!deepChild || deepChild.key == null) return;

				// In Preact, all keys are stored as object values, i.e. being strings
				var key = deepChild.key + '';

				if (keys.hasOwnProperty(key)) {
					console.error('Following component has two or more children with the ' + 'same "key" attribute. This may cause glitches and misbehavior ' + 'in rendering process. Component: \n\n' + serializeVNode(vnode));

					// Return early to not spam the console
					return true;
				}

				keys[key] = true;
			});
		}

		if (oldVnodeOption) oldVnodeOption.call(this, vnode);
	};

	try {
		var oldRender = preact.render;
		preact.render = function (vnode, parent, merge) {
			if (parent == null && merge == null) {
				// render(vnode, parent, merge) can't have both parent and merge be undefined
				console.error('The "containerNode" or "replaceNode" is not defined in the render method. ' + 'Component: \n\n' + serializeVNode(vnode));
			} else if (parent == merge) {
				// if parent == merge, it doesn't reason well and would cause trouble when preact
				// tries to update or replace that 'replaceNode' element
				console.error('The "containerNode" and "replaceNode" are the same in render method, ' + 'when the "replaceNode" DOM node is expected to be a child of "containerNode". ' + 'docs-ref: https://preactjs.com/guide/api-reference#-preact-render-. Component: \n\n' + serializeVNode(vnode));
			}
			return oldRender(vnode, parent, merge);
		};
	} catch (e) {}

	var inspectChildren = function inspectChildren(children, inspect) {
		if (!Array.isArray(children)) {
			children = [children];
		}
		return children.some(function (child, i) {
			if (Array.isArray(child)) {
				return inspectChildren(child, inspect);
			}

			return inspect(child, i);
		});
	};

	var serializeVNode = function serializeVNode(_ref) {
		var nodeName = _ref.nodeName,
		    attributes = _ref.attributes,
		    children = _ref.children;

		if (typeof nodeName === 'function') {
			nodeName = nodeName.name || nodeName.displayName;
		}

		var props = '';
		if (attributes) {
			for (var attr in attributes) {
				if (attributes.hasOwnProperty(attr) && attr !== 'children') {
					var value = attributes[attr];

					// If it is an object but doesn't have toString(), use Object.toString
					if (typeof value === 'function') {
						value = 'function ' + (value.displayName || value.name) + '() {}';
					}
					if (Object(value) === value && !value.toString) {
						value = Object.prototype.toString.call(value);
					} else {
						value = value + '';
					}

					props += ' ' + attr + '=' + JSON.stringify(value);
				}
			}
		}

		return '<' + nodeName + props + (children && children.length ? '>..</' + nodeName + '>' : ' />');
	};

	require('preact/devtools');
}

//# sourceMappingURL=debug.js.map