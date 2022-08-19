import test from "ava";
import * as UrlSub from "../src/index";

test("accepts empty params", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "", {}),
    "https://api.example.com/"
  );
});

test("substitutes route parameters", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user/:username/bio", {
      username: "jake",
    }),
    "https://api.example.com/user/jake/bio"
  );
});

test("adds query params", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/", {
      keyA: "valA",
      keyB: "valB",
    }),
    "https://api.example.com/?keyA=valA&keyB=valB"
  );
});

test("accepts numbers as route params", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user/:id", {
      id: 1,
    }),
    "https://api.example.com/user/1"
  );
});

test("accepts numbers as query params", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: 1,
    }),
    "https://api.example.com/user?id=1"
  );
});

test("accepts booleans as query params", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: 1,
      filter_new: true,
    }),
    "https://api.example.com/user?filter_new=true&id=1"
  );
});

test("omits params with undefined values", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: undefined,
    }),
    "https://api.example.com/user"
  );
});

test("omits params with null values", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user", {
      id: null,
    }),
    "https://api.example.com/user"
  );
});

test("throws an MissingSubstituteError for unmatched route params", (t) => {
  t.throws(() => UrlSub.formatUrl("https://api.example.com", "/user/:id", {}), {
    instanceOf: UrlSub.MissingSubstituteError,
  });
});

test("has named formatUrl export", (t) => {
  t.is(typeof UrlSub.formatUrl, "function");
});

test("encodes route components", (t) => {
  t.is(
    UrlSub.formatUrl("https://api.example.com", "/user/:id", {
      id: "with,comma",
    }),
    "https://api.example.com/user/with%2Ccomma"
  );
});

test("allows not encoding url params", (t) => {
  t.is(
    UrlSub.formatUrlWithOptions(
      "https://api.example.com/",
      "/user",
      {
        normally_encoded: "https://dont-encode-me.com",
      },
      { encodeParams: false }
    ),
    "https://api.example.com/user?normally_encoded=https://dont-encode-me.com"
  );
});
