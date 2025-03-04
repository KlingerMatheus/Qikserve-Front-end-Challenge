import { useEffect, useState } from "react";

import { Menu } from "@/types";

function useMenuDetails() {
  const [menuDetails, setMenuDetails] = useState<Menu | null>();
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  // const apiUrl = "https://cdn-dev.preoday.com/challenge";

  console.log(apiUrl);

  useEffect(() => {
    fetch(`${apiUrl}/menu`)
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
