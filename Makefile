NPM_BIN=$(CURDIR)/node_modules/.bin
TESTS=test/spec/*.js

CLIENT_NAMES=start.js const.js crypto.js math.js factor.js formula.js rAnk.js end.js
CLIENT_FILES=$(addprefix client/,$(CLIENT_NAMES))

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

rAnk.js: $(CLIENT_FILES)
	@echo 'Generating rAnk.js...'
	@cat $(CLIENT_FILES) | grep -v 'module.exports' | grep -v 'require(' > $@


.PHONY: test test-cov clean-cov
