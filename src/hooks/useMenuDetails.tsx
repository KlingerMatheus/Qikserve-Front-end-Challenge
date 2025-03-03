import { useEffect, useState } from "react";
import { Menu } from "@/types";

function useMenuDetails() {
  const [menuDetails, setMenuDetails] = useState<Menu | null>();
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error on requesting from API");
        }
        return response.json();
      })
      .then((data) => {
        setMenuDetails(data);
      })
      .finally(() => setIsMenuLoading(false));
  }, []);

  return { menuDetails, isMenuLoading };
}

export default useMenuDetails;
