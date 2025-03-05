import { getWebSettings } from "../api/getTheme.ts";

export async function applyTheme(venueId: string) {
  const venueData = await getWebSettings(venueId);

  if (venueData && venueData.webSettings) {
    const {
      backgroundColour,
      primaryColour,
      primaryColourHover,
      navBackgroundColour,
    } = venueData.webSettings;

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
    document.documentElement.style.setProperty("--primary-color-hover", "#555");
    document.documentElement.style.setProperty(
      "--nav-background-color",
      "#333"
    );
  }
}
