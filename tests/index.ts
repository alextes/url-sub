import { test } from "uvu";
import * as assert from "uvu/assert";
import * as UrlSub from "../src/index.js";
import urlSub from "../src/index.js";

test("accepts empty params", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "", {}),
    "https://api.example.com/"
  );
});

test("substitutes route parameters", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/user/:username/bio", {
      username: "jake",
    }),
    "https://api.example.com/user/jake/bio"
  );
});

test("adds query params", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/", {
      keyA: "valA",
      keyB: "valB",
    }),
    "https://api.example.com/?keyA=valA&keyB=valB"
  );
});

test("accepts numbers as route params", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/user/:id", {
      id: 1,
    }),
    "https://api.example.com/user/1"
  );
});

test("accepts numbers as query params", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: 1,
    }),
    "https://api.example.com/user?id=1"
  );
});

test("omits params with undefined values", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: undefined,
    }),
    "https://api.example.com/user"
  );
});

test("omits params with null values", () => {
  assert.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: null,
    }),
    "https://api.example.com/user"
  );
});

test("throws an error for unmatched route params", () => {
  assert.throws(() =>
    UrlSub.formatUrl("https://api.example.com", "/user/:id", {})
  );
});

test("has a default export with formatUrl", () => {
  assert.type(urlSub.formatUrl, "function");
});

test("has named formatUrl export", () => {
  assert.type(UrlSub.formatUrl, "function");
});

test.run();
