# URL Sub 🔗↔️

Format URLs for fetch requests using templates and substitution values.

## usage
```ts
import * as UrlSub from "url-sub"

UrlSub.formatUrl("https://api.example.com", "/user/:username/bio", {
  username: "jake",
  exclude_sensitive: true
})

// https://api.example.com/user/jake/bio?exclude_sensitive=true
```
