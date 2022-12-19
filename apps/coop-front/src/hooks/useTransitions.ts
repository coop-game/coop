import * as React from "react";
import { CPLanguage, getTranslation } from "./../translations";

export function useTranslation(locale?: CPLanguage) {
  return React.useMemo(() => {
    return getTranslation(locale ?? navigator.language.split(/[-_]/)[0]);
  }, [locale]);
}
