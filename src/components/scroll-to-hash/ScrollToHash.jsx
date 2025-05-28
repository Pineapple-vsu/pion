import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current && location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
    hasNavigated.current = true;
  }, [location]);

  return null;
}

export default ScrollToHash;
