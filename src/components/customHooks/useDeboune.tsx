import { useMemo, useCallback } from "react";
import { debounce } from "src/utility/debounce";

export const useDebounce = <
  T,
  K extends keyof T
>(
  toppersData: T[],
  setSearchData: React.Dispatch<React.SetStateAction<T[]>>,
  key: K
) => {
  // Wrap the search logic with useCallback
  const searchFn = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setSearchData(toppersData);
        return;
      }

      const filtered = toppersData.filter((item) => {
        const fieldValue = item[key];
        return (
          typeof fieldValue === "string" &&
          fieldValue.toLowerCase().includes(value.trim().toLowerCase())
        );
      });

      setSearchData(filtered);
    },
    [toppersData, setSearchData, key] // correct deps
  );

  // Memoize the debounced version
  const debounceFetch = useMemo(() => debounce(searchFn, 500), [searchFn]);

  return { debounceFetch };
};
