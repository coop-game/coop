# Next-i18next Next.js 에서 다국어 지원을 위한 라이브러리

### Next.js에서 기본적으로 다국어 지원을 위한 설정을 제공 하고 있다.

```js
// https://nextjs.org/docs/advanced-features/i18n-routing
```

사용 방법은 다음과 같다.

- next.config.js에 다음과 같이 설정 한다.

```js
// next.config.js
module.exports = {
  i18n: {
    // 지원하고 싶은 로케일을 배열로 기록하면 된다.
    locales: ["ko", "en-US"],
    // 기본적으로 지원 하는 로케일을 적으면 된다.
    defaultLocale: "ko",
    // 로케일을 자동으로 탐지하게 해주는 옵션이다. 기본적으로 브라우저 요청의 Accept-Language를 확인하고 로케일을 탐지한다. 기본 값은 true이다.
    localeDetection: true,
  },
};
```

위와 같이 next.config.js를 설정하면 브라우저 언어 설정에 따라서 로케일에 따라 주소를 다르게 설정 해줄 것이다.

문제가 있다면 실제 빌드 혹은 배포시에 문제가 발생하게 된다.

이유로는 Next.js에서 지원하는 기능은 그저 로케일과 URL을 동기화 시키는 일만 하기 때문에 실제로 번역된 페이지나 여러가지 다국어 관련된 요소는 제공하고 있지 않기 때문이다.

그렇기 때문에 실제 배포시에는 다른 방법을 생각해야 한다.

해결 방법을 위해 정보를 찾아다닌 결과 next_i18next 라이브러리를 찾았고 SSR/SSG 등 Next.js에서 필요한 여러가지 요소를 완벽하게 지원하는 모듈이었다.

## 공식문서 주소

---

```js
// https://github.com/i18next/next-i18next
```

## 설정방법

---

설정 방법은 간단 하다.

먼저 yarn을 사용하여 설치한다.

```
yarn add next-i18next react-i18next i18next
```

react-18next에 의존성을 가지고 있기 때문에 같이 설치 해주어야 한다.

번역과 관련된 파일들은 public 파일의 locales 폴더를 만들고 각각 언어에 대응할 json 파일을 만들어 번역한다.

```
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── ko
            └── common.json
```

만약 다른 폴더를 지정하고 싶다면 next-i18next.config.js 파일에서 추가해주면 된다.

다음으로는 프로젝트에 대해 설정하기 위해 next-i18next.config.js 파일에 다음과 같이 추가한다.

```js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localePath: path.resolve("./public/locales"),
  },
};
```

대부분은 Next.js에서 기본적으로 제공하는 내용과 일치한다.

Vercel과 같은 환경에서 배포한다면 실제 파일 위치가 달라질 수 있기 떄문에 localePath를 직접 지정해서 빌드 환경에서 문제가 발생하지 않도록 처리 해준다.

만약 설정하지 않는다면 Vercel에서 빌드시 에러가 발생한다.
실제 파일 위치가 달라지면서 발생하는 에러인걸로 추정된다.

그 다음으로는 next.config.js에 위에 설정한 파일에 넣어주기만 하면 설정은 끝이 난다.

```js
const { i18n } = require("./next-i18next.config");
module.exports = {
  i18n,
};
```

다음으로는 \_app.tsx에 appWithTranslation()을 임포트 하고 감싸주면 된다.

```js
// _app.tsx

export default appWithTranslation(App);
```

그 다음으로는 SSG/SSR 대응을 위해 getStaticProps 혹은 getServerSideProps를 사용한다.

모든 페이지에 기록을 해야한다.

```js
// getStaticProps의 경우
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
```

```js
// getServerSideProps의 경우
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "ko", ["common"])),
    },
  };
};
```

그 다음으로는 번역이 필요한 파일에서 아래와 같이 작성하면 된다.

```js
import { useTranslation } from "next-i18next";

const test = () => {
  const { t } = useTranslation("common");
  return <div>{t("title")}</div>;
};
```

t함수 안에 들어갈 값은 json 파일에 있는 값의 id를 적으면 된다.
