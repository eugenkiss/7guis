react-static=./node_modules/react-static/bin/react-static
serve=./node_modules/serve/bin/serve.js

# Smart install: Only executes if package.json's
# modification date is later than node_module's
install: node_modules

node_modules: package.json
	npm install
	@touch -m node_modules

run: node_modules
	$(react-static) start

build: node_modules public src .babelrc static.config.js
	$(react-static) build

serve:
	$(react-static) build

publish: build
	rm -rf gh-pages
	git clone -b gh-pages --single-branch --depth 1 git@github.com:eugenkiss/7guis.git gh-pages
	rm -rf gh-pages/*
	cp -r dist/* gh-pages/
	cd gh-pages && git add . && git commit --amend -m "Update site" && git push -f
	rm -rf gh-pages
