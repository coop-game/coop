# coop-front

랜덤 => 뒷사람이 문제를 맞추고 [V]
혹여나 뒷사람이 사람이 나가서 없다면 랜덤 or 페이지넘기기 [?]

yjs를 컨트롤 하는 부분 그니까 데이터를 수정하는 부분은
/lobby부터 gameStart를 하면 죠져지니까

1. userProfiles 말고 gameUserProfiles 를 만든다
2. gameState.isGameStart 기준으로 true이면 gameUserProfiles을 userProfiles와 동기화
3. false이면 동기화하지 않으며, 사람들이 나갈경우 gameUserProfiles.isConnected를 false로 바꾼다.
4. gameUserProfiles.isConnected가 false일 때 같은 clientID가 들어오면 connected를 true로 바꾸고
5. gameUserProfiles.isConnected가 true일때 같은 clientID가 들어오지 못하게 막기.

6. 게임중 중도이탈시 로비로 돌아가던가 or PageIndex+1 [v]
7. 게임도중 뒤로가기 막기 [v]
8. /draw 페이지 모바일 ui 대응 []
9. 페이지 넘어갔을때 현재 있는 그림 저장하고 초기화 [?]
10. 데이터셋 기반으로 랜덤 단어 api 만들어보기
11. 게임 도중 들어오는거 방지는 하지 않아요, 같은 유저면 들어와서 하게끔 하기
12. 강퇴기능 yjs에서 기본적으로 지원하지 않음, => useBanUpdate 를 통해 관리하고

13. 절대 뒤로가기를 누르면 안돼!!
14. progress bar endtime을 전송해서 user끼리 동기화 해보기 [v]

장석찬 =>

1. userGameProfiles 만들고 갱신
2. tldraw 초기화 및 데이터 ~~questionState에 저장하기~~ `yShape ${pageIndex}`를 key값으로 사용함 [v]
3. progressbar 동기화하기 [v]
4. useObjectUpdate 만들기
5. drawee 뒷사람이 없다면 페이지 넘기기 [v] 문제 푸는 사람이 없다면 다음 페이지로 넘어감 [v]
   1. hooks로 최적화 해볼것
6. result 보여주는 페이지 만들기
7. 뒤로가기 막기 [v]

정진 =>

1. 게임 만들기

공통

1. 디자인
2. 도메인 [v]
3. SEO

// -----------------------------------------------

1. 페이지 넘어가는거 공책

2. 스크롤 연필로 바꾸는거

3. 게임 시작할때 이펙트?

4. 로고 바꿀거 있나 체크

5. 테두리 stack처럼 쌓이는 => 종이느낌

6. 게임창 및 결과창 디자인 ???

7. 서버사이드는 딱 레이아웃 + 로딩 만 되어있음 더 추가할건 없어

8. /welcome 페이지에 서버사이드 넣고

9. nextauth => 디스코드 추가

10. 트위치 연동????

11. 히스토리 내역 연동

12. ? 게임 도움말 알려주는거

반응형 준비

/ => ? 표시 클릭 or hover 시 tooltip 보여주기 => 게임 방법 대충

/lobby 에서 채팅 사이즈 줄여주면 OK

1. 그린다
   손 + 연필 => svg
   손 그려지고 => 연필 그려지고

2. 소통한다

사람 둘 그려지고 => 0 ))) ((( 0

3. 맞춘다

사람 그려지고 => 머리 위에 느낌표?

stroke-linecap : 선 끝의 모양을 결정하는 것

- butt; (디폴트 값, 기본값, 윗사진처럼 끊어지게)
- round; (둥글게)
- square; (butt 와 유사하나 path끝에서 여유공간을 두고 감싸며 끊어진다.)

stroke-linejoin : 선의 꺾이는 부분의 모양을 결정

- miter : 직각
- round : 둥글게
- bevel : 45도 정도 끝이 잘려서

vercel 에서 next-i18next로 getServerSideProps에서 useTranslation 훅스를 사용했을 때 json 파일을 못 찾은 경우
(로컬에서는 경로를 잘 찾으나 vercel 같은 서버리스 Paas 의 경우 경로를 찾지 못함)

```js
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localePath: path.resolve("./public/locales"), // 추가해야하는 부분
  },
};
```

[scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)
- history scroll 컴포넌트 제작시 사용
- `display:flex;`를 사용시 `flex: none;`을 같이 사용해 주어야한다.
- 
