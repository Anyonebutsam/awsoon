import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures hash navigation like /#services scrolls to the section in an SPA.
 * We keep it "snap" (behavior: auto) to match user expectation.
 */
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) {
        attempts += 1;
        if (attempts <= maxAttempts) {
          window.setTimeout(tryScroll, 50);
        }
        return;
      }

      el.scrollIntoView({ behavior: "auto", block: "start" });

      // Offset for sticky header if present
      const header = document.querySelector("header");
      const offset = header ? header.getBoundingClientRect().height + 8 : 0;
      if (offset) {
        window.scrollBy({ top: -offset, left: 0, behavior: "auto" });
      }
    };

    // Let the route render first
    window.setTimeout(tryScroll, 0);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;
