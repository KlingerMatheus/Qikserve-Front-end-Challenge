async function getWebSettings(venueId: string) {
  try {
    const response = await fetch(`/api/venue/${venueId}`);
    if (!response.ok) {
      throw new Error(
        `Failed on requesting web settings data: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while gathering web settings data:", error);
    return null;
  }
}

export { getWebSettings };
