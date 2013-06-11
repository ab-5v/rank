NPM_BIN=$(CURDIR)/node_modules/.bin
TESTS=test/spec/*.js

CLIENT_SORCE=$(addprefix client/,const.js crypto.js math.js factor.js formula.js rAnk.js)
CLIENT_FILES=client/start.js $(CLIENT_SORCE) client/end.js
CLIENT_TESTS=client/start.js $(CLIENT_SORCE) test/mock/*.js test/spec/*.js client/end.js

all: node_modules test rAnk.js test/client_spec.js

node_modules: package.json
	npm install

test:
	@NODE_ENV=test $(NPM_BIN)/mocha --reporter dot --timeout 200 $(TESTS)

lib-cov: clean-cov
	@jscoverage --encoding=utf8 --no-highlight lib lib-cov

test-cov: lib-cov
	@COVERAGE=1 $(NPM_BIN)/mocha --reporter html-cov $(TESTS) > coverage.html || exit 0

test-coveralls: lib-cov
	@COVERAGE=1 $(NPM_BIN)/mocha --reporter mocha-lcov-reporter $(TESTS) > coverage.lcov
	@cd lib-cov; cat ../coverage.lcov | $(NPM_BIN)/coveralls

clean-cov:
	@rm -rf lib-cov coverage.html coverage.lcov

rAnk.js: $(CLIENT_FILES)
	@echo 'Generating rAnk.js...'
	@cat $(CLIENT_FILES) | grep -Ev 'require|module.exports' > $@

test/client_spec.js: $(CLIENT_TESTS)
	@echo 'Generating client_spec.js...'
	@cat $(CLIENT_TESTS) | grep -Ev 'require|module.exports|process.env' > $@

.PHONY: test test-cov clean-cov
