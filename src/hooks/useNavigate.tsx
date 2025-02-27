import { useEffect, useState } from "react";

function useNavigate() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    function handleLocationChange() {
      setRoute(window.location.pathname);
    }

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return {
    route,
  };
}

export default useNavigate;
