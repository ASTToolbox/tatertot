import config from "../config.json" assert { type: "json" };
import fs from "fs";

let html = `<!DOCTYPE html>
<head>
  <title>${config.page.title}</title>
  <meta content="${config.embed.title}" property="og:title" />
  <meta content="${config.embed.description}" property="og:description" />
  <meta content="${config.embed.url}" property="og:url" />
  <meta content="${config.embed.image}" property="og:image"/>
  <meta content="${config.embed.color}" data-react-helmet="true" name="theme-color" />
  <style>
    .body { width: 100vw; height: 100vh; padding: 0px; margin: 0px; overflow: hidden;};
  </style>
  <script async src="./taterloader.js"></script>
   <script src="https://unpkg.com/@ungap/custom-elements-builtin"></script>
    <script type="module" src="data:text/javascript;charset=utf-8;base64,Y3VzdG9tRWxlbWVudHMuZGVmaW5lKCd4LWZyYW1lLWJ5cGFzcycsIGNsYXNzIGV4dGVuZHMgSFRNTElGcmFtZUVsZW1lbnQgewoJc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7CgkJcmV0dXJuIFsnc3JjJ10KCX0KCWNvbnN0cnVjdG9yICgpIHsKCQlzdXBlcigpCgl9CglhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKCkgewoJCXRoaXMubG9hZCh0aGlzLnNyYykKCX0KCWNvbm5lY3RlZENhbGxiYWNrICgpIHsKCQl0aGlzLnNhbmRib3ggPSAnJyArIHRoaXMuc2FuZGJveCB8fCAnYWxsb3ctZm9ybXMgYWxsb3ctbW9kYWxzIGFsbG93LXBvaW50ZXItbG9jayBhbGxvdy1wb3B1cHMgYWxsb3ctcG9wdXBzLXRvLWVzY2FwZS1zYW5kYm94IGFsbG93LXByZXNlbnRhdGlvbiBhbGxvdy1zYW1lLW9yaWdpbiBhbGxvdy1zY3JpcHRzIGFsbG93LXRvcC1uYXZpZ2F0aW9uLWJ5LXVzZXItYWN0aXZhdGlvbicgLy8gYWxsIGV4Y2VwdCBhbGxvdy10b3AtbmF2aWdhdGlvbgoJfQoJbG9hZCAodXJsLCBvcHRpb25zKSB7CgkJaWYgKCF1cmwgfHwgIXVybC5zdGFydHNXaXRoKCdodHRwJykpCgkJCXRocm93IG5ldyBFcnJvcihgWC1GcmFtZS1CeXBhc3Mgc3JjICR7dXJsfSBkb2VzIG5vdCBzdGFydCB3aXRoIGh0dHAocyk6Ly9gKQoJCWNvbnNvbGUubG9nKCdYLUZyYW1lLUJ5cGFzcyBsb2FkaW5nOicsIHVybCkKCQl0aGlzLnNyY2RvYyA9IGA8aHRtbD4KPGhlYWQ+Cgk8c3R5bGU+CgkubG9hZGVyIHsKCQlwb3NpdGlvbjogYWJzb2x1dGU7CgkJdG9wOiBjYWxjKDUwJSAtIDI1cHgpOwoJCWxlZnQ6IGNhbGMoNTAlIC0gMjVweCk7CgkJd2lkdGg6IDUwcHg7CgkJaGVpZ2h0OiA1MHB4OwoJCWJhY2tncm91bmQtY29sb3I6ICMzMzM7CgkJYm9yZGVyLXJhZGl1czogNTAlOyAgCgkJYW5pbWF0aW9uOiBsb2FkZXIgMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7Cgl9CglAa2V5ZnJhbWVzIGxvYWRlciB7CgkJMCUgewoJCXRyYW5zZm9ybTogc2NhbGUoMCk7CgkJfQoJCTEwMCUgewoJCXRyYW5zZm9ybTogc2NhbGUoMSk7CgkJb3BhY2l0eTogMDsKCQl9Cgl9Cgk8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgoJPGRpdiBjbGFzcz0ibG9hZGVyIj48L2Rpdj4KPC9ib2R5Pgo8L2h0bWw+YAoJCXRoaXMuZmV0Y2hQcm94eSh1cmwsIG9wdGlvbnMsIDApLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpLnRoZW4oZGF0YSA9PiB7CgkJCWlmIChkYXRhKQoJCQkJdGhpcy5zcmNkb2MgPSBkYXRhLnJlcGxhY2UoLzxoZWFkKFtePl0qKT4vaSwgYDxoZWFkJDE+Cgk8YmFzZSBocmVmPSIke3VybH0iPgoJPHNjcmlwdD4KCS8vIFgtRnJhbWUtQnlwYXNzIG5hdmlnYXRpb24gZXZlbnQgaGFuZGxlcnMKCWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7CgkJaWYgKGZyYW1lRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaHJlZikgewoJCQllLnByZXZlbnREZWZhdWx0KCkKCQkJZnJhbWVFbGVtZW50LmxvYWQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ocmVmKQoJCX0KCX0pCglkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBlID0+IHsKCQlpZiAoZnJhbWVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5mb3JtICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZm9ybS5hY3Rpb24pIHsKCQkJZS5wcmV2ZW50RGVmYXVsdCgpCgkJCWlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LmZvcm0ubWV0aG9kID09PSAncG9zdCcpCgkJCQlmcmFtZUVsZW1lbnQubG9hZChkb2N1bWVudC5hY3RpdmVFbGVtZW50LmZvcm0uYWN0aW9uLCB7bWV0aG9kOiAncG9zdCcsIGJvZHk6IG5ldyBGb3JtRGF0YShkb2N1bWVudC5hY3RpdmVFbGVtZW50LmZvcm0pfSkKCQkJZWxzZQoJCQkJZnJhbWVFbGVtZW50LmxvYWQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5mb3JtLmFjdGlvbiArICc/JyArIG5ldyBVUkxTZWFyY2hQYXJhbXMobmV3IEZvcm1EYXRhKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZm9ybSkpKQoJCX0KCX0pCgk8L3NjcmlwdD5gKQoJCX0pLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcignQ2Fubm90IGxvYWQgWC1GcmFtZS1CeXBhc3M6JywgZSkpCgl9CglmZXRjaFByb3h5ICh1cmwsIG9wdGlvbnMsIGkpIHsKCQljb25zdCBwcm94aWVzID0gKG9wdGlvbnMgfHwge30pLnByb3hpZXMgfHwgWyJodHRwczovL2FwaS5jb2RldGFicy5jb20vdjEvcHJveHkvP3F1ZXN0PSJdCgkJcmV0dXJuIGZldGNoKHByb3hpZXNbaV0gKyB1cmwsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHsKCQkJaWYgKCFyZXMub2spCgkJCQl0aHJvdyBuZXcgRXJyb3IoYCR7cmVzLnN0YXR1c30gJHtyZXMuc3RhdHVzVGV4dH1gKTsKCQkJcmV0dXJuIHJlcwoJCX0pLmNhdGNoKGVycm9yID0+IHsKCQkJaWYgKGkgPT09IHByb3hpZXMubGVuZ3RoIC0gMSkKCQkJCXRocm93IGVycm9yCgkJCXJldHVybiB0aGlzLmZldGNoUHJveHkodXJsLCBvcHRpb25zLCBpICsgMSkKCQl9KQoJfQp9LCB7ZXh0ZW5kczogJ2lmcmFtZSd9KQo="></script>
</head>

<body class="body">
  <script async>
    setTimeout(() => {
     window.location.replace("${config.redirect}")
    }, ${config.delay});
  </script>

  <iframe is="x-frame-bypass" src="${config.iframe}" style="box-shadow: none !important; width: 100vw; height: 100vh;"></iframe>
</body>
`;

console.log(html)
