NPM_BIN=$(CURDIR)/node_modules/.bin
TESTS=test/spec/*.js

all: node_modules test rAnk.js

node_modules: package.json
	npm install

test:
	@NODE_ENV=test $(NPM_BIN)/mocha --reporter spec $(TESTS)

test-cov: lib-cov
	@COVERAGE=1 $(NPM_BIN)/mocha --reporter html-cov $(TESTS) > coverage.html || exit 0

lib-cov: clean-cov
	@jscoverage --encoding=utf8 --no-highlight lib lib-cov

clean-cov:
	@rm -rf lib-cov coverage.html

rAnk.js: lib/*.js
	@echo 'Generating rAnk.js...'
	@cat lib/math.js     >  $@
	@cat lib/factor.js   >> $@
	@cat lib/formula.js  >> $@
	@cat lib/rAnk.js     >> $@


.PHONY: test test-cov clean-cov
