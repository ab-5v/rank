NPM_BIN=$(CURDIR)/node_modules/.bin
TESTS=test/spec/*.js

all: node_modules test

node_modules:
	npm install

test:
	@NODE_ENV=test $(NPM_BIN)/mocha --reporter dot $(TESTS)

test-cov: lib-cov
	@COVERAGE=1 $(NPM_BIN)/mocha --reporter html-cov $(TESTS) > coverage.html

lib-cov: clean-cov
	@jscoverage --encoding=utf8 --no-highlight lib lib-cov

clean-cov:
	@rm -rf lib-cov coverage.html


.PHONY: test test-cov clean-cov
