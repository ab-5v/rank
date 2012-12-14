NPM_BIN=$(CURDIR)/node_modules/.bin
TESTS=test/spec/*.js

all: node_modules test

node_modules:
	npm install

test:
	$(NPM_BIN)/mocha  --reporter dot $(TESTS)

.PHONY: test
