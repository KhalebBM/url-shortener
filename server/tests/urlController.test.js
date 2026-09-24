const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeBaseUrl,
  isValidUrl,
} = require("../controllers/urlController");

test("normalizeBaseUrl removes trailing slashes", () => {
  assert.equal(
    normalizeBaseUrl("https://url.svcydigital.my.id/"),
    "https://url.svcydigital.my.id",
  );
  assert.equal(
    normalizeBaseUrl("https://url.svcydigital.my.id"),
    "https://url.svcydigital.my.id",
  );
});

test("isValidUrl only accepts http and https URLs", () => {
  assert.equal(isValidUrl("https://example.com"), true);
  assert.equal(isValidUrl("http://example.com"), true);
  assert.equal(isValidUrl("ftp://example.com"), false);
  assert.equal(isValidUrl("not-a-url"), false);
});
