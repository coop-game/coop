# Next-SEO

### Next-SEO는 Next.js에서 더 편하게 메타 태그들을 관리해주는 플러그인 입니다.

메타 태그를 사용하여 구글 검색에 사이트가 뜨게끔 해주며 메신저를 통해 다른 사람들과 사이트를 공유할 때도 현재 사이트를 더 잘 알 수 있도록 하기 위해 사용합니다.


<br>공식 Github의 주소는 아래와 같습니다.

<a>https://github.com/garmeeh/next-seo#readme</a>

## 사용방법

---

먼저 플러그인을 사용하기 위해서는 yarn add를 통해 설치합니다.

```ts
yarn add next-seo
```

그 다음으로는 메타태그를 추가하고 싶은 페이지에 NextSeo를 추가하여 원하는 내용을 넣어주면 됩니다.

NextSeo는 원하는 태그만 넣어도 알아서 처리해주기 때문에 모든 요소를 넣어줄 필요는 없습니다.

예를 들어 제목과 설명만 필요한 페이지라면 아래와 같이 작성 하면 됩니다.

```ts
import { NextSeo } from "next-seo";

const App = () => {
  return (
    <>
      <NextSeo title="제목" description="설명" />
      <p>예제입니다.</p>
    </>
  );
};

export default App;
```

더 많은 옵션을 제공 하기 때문에 관련해서는 공식 문서를 참고하는 것이 좋습니다.

만약 기본값으로 모든 페이지에 값이 들어가야 하는 경우 DefaultSeo를 활용하여 값을 미리 넣어줄 수 있습니다.

```ts
import App, { Container } from "next/app";
import { DefaultSeo } from "next-seo";

// import your default seo configuration
import SEO from "../next-seo.config";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://www.url.ie/",
            siteName: "SiteName",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}
```

원한다면 설정 값을 따로 뺄 수 있습니다.

```ts
// next-seo-config.ts
const URL = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3001";
const SEO = {
  title: "Drawee",
  defaultTitle: "Drawee",
  description: "다함께 그림을 그리면서 즐기는 게임!",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon-32x32.png",
      sizes: "32x32",
    },
  ],
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#721480",
    },
  ],
  openGraph: {
    type: "website",
    locale: "ko",
    url: URL,
    images: [
      {
        url: "/icon-184x184.png",
        width: 285,
        height: 167,
        alt: "Drawee로고",
      },
    ],
    siteName: "Drawee",
  },
};
export default SEO;
```

그 다음 DefaultSeo에 다음과 같이 넣어준다.

```ts
<DefaultSeo {...SEO} />
```
