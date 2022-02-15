# Url Builder 🔗👷

A small library that helps format URLs for fetch requests.

## usage
```ts
import * as UrlBuilder from "url-builder"

UrlBuilder.formatUrl("https://api.example.com", "/user/:username/bio", {
  username: "jake",
  exclude_sensitive: true
})

// https://api.example.com/user/jake/bio?exclude_sensitive=true
```
