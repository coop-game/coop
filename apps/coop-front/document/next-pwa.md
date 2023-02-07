# next-pwa

## Next.js에서 간단하게 PWA를 지원하도록 하는 모듈.

모듈을 사용하여 핸드폰에서도 마치 앱을 사용하는것과 비슷한 경험을 줄 수 있다.

어느 플랫폼에서나 동일한 환경을 제공 할 수 있으며 모든 플랫폼을 손쉽게 지원 할 수 있다는 점에서 사용하면 좋다.

먼저 필요한 모듈을 설치한다.

```ts
yarn add next-pwa
```

그 다음으로는 webpack을 설정해주면 된다.

```ts
// next.config.js

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
```

그러고나서 manifest.json을 작성하면 된다.

```ts
{
    "theme_color": "#721480",
    "background_color": "#0c5900",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "test",
    "short_name": "Drawee",
    "description": "description!",
    "icons": [
                {
            "src": "/icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "any maskable"
        },
                {
            "src": "/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "any maskable"
        },
                {
            "src": "/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "any maskable"
        },
                {
            "src": "/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "any maskable"
        },
                {
            "src": "/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "any maskable"
        },{
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ]
}
```

아이콘 형식과 경로만 잘 적어주면 된다.

그 다음으로는 메타 태그들을 작성해주면 된다.

```ts
// _document.tsx

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="images/icons/icon-192x192.png"
        ></link>
        <meta name="msapplication-TileColor" content="#721480b2"></meta>
      </Head>
      <body></body>
    </Html>
  );
}
```

이 다음으로는 빌드 한 다음 실행 시켜서 구글 크롬 개발자 도구의 라이트 하우스를 통해 PWA가 가능한지 확인 할 수 있다.

그것만 확인 하면 PWA 대응은 끝이다.
