import { useState, useEffect } from "react";

// определяет, является ли текущее окно размером меньше или равным указанному брейкпоинту (по умолчанию 550)
const useResponsive = (breakpoint = 550) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useResponsive;
