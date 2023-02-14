# Framer-motion

## 1. Framer-motion 이란

[Framer Motion은 Framer](https://www.framer.com/) 의 React용 모션 라이브러리입니다 .

## 2. Framer-motion 을 쓴 이유가 뭔가요?

Emotion.js로 하나씩 애니메이션을 직접 구현하기 보다는 간편하게 이미 구현 되어있는 라이브러리를 통해서 애니메이션을 제작하는게 비용적인 측면에서 절감하고 더 화려한 애니메이션을 넣을 수 있을것이라 생각했기 때문입니다.

특히 SVG 이미지의 애니메이션을 만드는데 필요했습니다.

## 3. 그래서 Famer-motion을 어디에 썼는데?

[Webpack App](https://storybook.drawee.art/)

위 주소의 Animation 부분은 모두 Framer-motion을 사용하였습니다.

예시를 몇개 적어보자면

- [DrawingHand](https://storybook.drawee.art/?path=/story/animations-drawinghand--primary&globals=locale:en) (다크모드 권장)

```tsx
// *hidden 상태일때와 visible 상태일때 pathLength를 통해 그려지는 애니메이션을 추가함*
const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};
const DrawingHand = () => {
  // 페이지 전환(router.path 기준) 에니메이션 상태
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      {isAnimationEnd && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448.378 448.378"
          css={css`
            height: 100%;
            width: 100%;
            overflow: visible;
          `}
        >
          <motion.path
            // 손 이미지 벡터 값
            d={hand}
            // variants에 icon 값을 넣어주고
            // initial(초기 상태) icon.hidden이 적용되며,
            // animate(애니메이션 재생 상태) icon.visible이 적용된다.
            variants={icon}
            initial="hidden"
            animate="visible"
            stroke={"#fff"} // 선 색깔
            strokeWidth="5" // 선 굵기
            strokeLinecap={"round"} // 선 끝을 둥글게
            strokeLinejoin={"round"} // 선이 꺽인 위치가 둥글게
            transition={{
              default: { duration: 2, ease: "linear" },
              fill: { delay: 1, duration: 1, ease: "linear" },
            }}
          />
        </motion.svg>
      )}
    </div>
  );
};
```

- [사진 슬라이드](https://storybook.drawee.art/?path=/story/animations-welcomepitcureslide--primary&globals=locale:en;backgrounds.grid:false)

```tsx
// 메인 페이지에서 사용한 애니메이션으로 스크롤을 감지하고 사진을
// 왼쪽 혹은 오른쪽으로 이동 시키는 함수입니다.
function MiddleContentPictureSlide({ index }: { index: number }) {
  const images = [stock1, stock2, stock3, stock4];
  return (
    <div
      css={css`
        overflow: hidden;
        width: 100%;
        height: 800px;
      `}
    >
      {/** 상위에서 감지된 index 번호에 따라 X의 스크롤을 움직입니다. */}
      <motion.div
        animate={{
          x: `${(+index - 1) * -100 - 50}%`,
          scale: 1,
          rotate: 0,
        }}
        transition={{ ease: "easeOut", duration: 1 }}
        css={css`
          display: flex;
          max-height: 50em;
          max-width: 80em;
          position: relative;
          left: 50%;
        `}
      >
        {images.map((v, idx) => {
          return (
            <Image
              css={css`
                margin-right: 10px;
              `}
              key={idx}
              width="1280"
              height="720"
              src={v}
              alt="테스트 이미지"
            ></Image>
          );
        })}
      </motion.div>
    </div>
  );
}
```

## 4. 써보니 어때?

실제로 간단한 설정 값을 넣음으로써 빠르고 쉽게 구현 할 수 있었고 다양한 설정 값을 통해 화려한 애니메이션을 넣을 수 있었습니다.

또한 variants 라는 파라미터를 통해 여러가지 설정 값들을 별도의 객체로 만들고 재사용 할 수 있다는 점 그리고 다양한 옵션을 줄 수 있다는 점에서 좋았습니다.
