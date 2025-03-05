import { Dispatch, SetStateAction } from "react";
import { getWebSettings } from "../api/getTheme";
import { useDispatch } from "react-redux";
import { venueActions } from "../reducers/slices/venueSlice";

async function applyThemeAndMetaTags(
  venueId: string,
  setPageIsLoading: Dispatch<SetStateAction<boolean>>
) {
  const dispatch = useDispatch();

  try {
    const data = await getWebSettings(venueId);

    document.title = data.name;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", data.description);

    if (data.webSettings) {
      const {
        backgroundColour,
        primaryColour,
        primaryColourHover,
        navBackgroundColour,
        bannerImage,
      } = data.webSettings;
      const bannerImageElement = document.querySelector("#banner-image");

      bannerImageElement?.setAttribute("src", bannerImage);

      console.log(bannerImageElement);

      document.documentElement.style.setProperty(
        "--background-color",
        backgroundColour
      );
      document.documentElement.style.setProperty(
        "--primary-color",
        primaryColour
      );
      document.documentElement.style.setProperty(
        "--primary-color-hover",
        primaryColourHover
      );
      document.documentElement.style.setProperty(
        "--nav-background-color",
        navBackgroundColour
      );
    } else {
      console.error(
        "Restaurant data not found, applied the default theme values."
      );
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--primary-color", "#333");
      document.documentElement.style.setProperty(
        "--primary-color-hover",
        "#555"
      );
      document.documentElement.style.setProperty(
        "--nav-background-color",
        "#333"
      );
    }

    dispatch(venueActions.addVenueData(data));
  } catch (error) {
    console.error("Error fetching API data:", error);
  }

  setPageIsLoading(false);
}

export default applyThemeAndMetaTags;
