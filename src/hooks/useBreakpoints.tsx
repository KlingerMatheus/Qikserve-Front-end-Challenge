import { useState, useEffect } from "react";

import { Device } from "@/types";

function useBreakpoints() {
  const [device, setDevice] = useState(getDevice());

  function handleResize() {
    setDevice(getDevice());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getDevice(): Device {
    const width = window.innerWidth;

    if (width < 600) {
      return "mobile";
    } else if (width < 960) {
      return "tablet";
    } else if (width < 1280) {
      return "laptop";
    } else {
      return "desktop";
    }
  }

  return {
    device,
    isMobileOrTablet: ["mobile", "tablet"].includes(device),
    isLaptopOrDesktop: ["laptop", "desktop"].includes(device),
  };
}

export default useBreakpoints;
