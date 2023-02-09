# framer motion의 useInView 사용시 IntersectionObserver의 root option 추가 방법

```js
// https://github.dev/framer/motion
// use-in-view.ts

import { inView, InViewOptions } from "@motionone/dom"; // ????????

export function useInView(
  ref: RefObject<Element>,
  { root, margin, amount, once = false }: Options = {}
) {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    ...
    const options: InViewOptions = {
      root: (root && root.current) || undefined, /// 중요 root가 있으면 옵션에 추가됨, 없으면 undefined
      margin,
      amount: amount === "some" ? "any" : amount,
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once]);
  ...
}
```

```js
// https://github.dev/motiondivision/motionone
// in-view.ts

export function inView(
  elementOrSelector: ElementOrSelector,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount = "any" }: InViewOptions = {}
): VoidFunction {
  ...

  const elements = resolveElements(elementOrSelector)
  const activeIntersections = new WeakMap<Element, ViewChangeHandler>()
  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    ...
  }

  const observer = new IntersectionObserver(onIntersectionChange, {
    root, // 중요
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount],
  })

  elements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
}
```
