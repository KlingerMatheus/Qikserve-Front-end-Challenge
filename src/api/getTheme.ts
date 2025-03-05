async function getThemeData(venueId: string) {
  try {
    const response = await fetch(`/api/venue/${venueId}`);
    if (!response.ok) {
      throw new Error(`Error on request: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while gathering theme data:", error);
    return null;
  }
}

export { getThemeData };
