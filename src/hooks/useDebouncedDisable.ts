import { useEffect, useState } from "react";

function useDebouncedDisable(value: string, delay: number = 1000): boolean {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!value.trim()) {
      setIsDisabled(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return isDisabled;
}

export default useDebouncedDisable;
