import { useEffect, useState } from "react";

import { Menu } from "../types";

function useMenuDetails() {
  const [menuDetails, setMenuDetails] = useState<Menu | null>();
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const apiUrl =
    import.meta.env.MODE === "production"
      ? process.env.REACT_APP_API_URL
      : "/api";

  console.log(apiUrl);

  useEffect(() => {
    let fetchUrl = `${apiUrl}/menu`;

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error on requesting from API");
        }
        return response.json();
      })
      .then((data) => {
        setMenuDetails(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsMenuLoading(false));
  }, []);

  return { menuDetails, isMenuLoading };
}

export default useMenuDetails;
