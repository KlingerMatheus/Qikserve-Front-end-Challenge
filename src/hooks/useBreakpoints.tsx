import { useState, useEffect } from "react";

type Device = "mobile" | "tablet" | "laptop" | "desktop";

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

  return device;
}

export default useBreakpoints;
