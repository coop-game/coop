import * as React from "react";
import { CPLanguage, getTranslation } from "./../translations";

export function useTranslation(locale?: CPLanguage) {
  // navigator.language 로 지역 위치 찾기
  return React.useMemo(() => {
    return getTranslation(
      locale ?? typeof window !== "undefined"
        ? navigator.language.split(/[-_]/)[0]
        : "ko-kr"
    );
  }, [locale]);
}
