import { TFunction } from "i18next";

function extractWeight(description: string): string {
  const weightMatch = description.match(/(\d+g)\s*/);
  return weightMatch ? weightMatch[1] : "";
}

function splitAndTrimParts(description: string, weight: string): string[] {
  return description
    .replace(weight, "")
    .trim()
    .split(/, | and /)
    .map((part) => part.trim());
}

function translatePart(part: string, t: TFunction): string {
  const hasDot = part.endsWith(".");
  const cleanedPart = hasDot ? part.slice(0, -1) : part;
  const camelCase = cleanedPart
    .split(" ")
    .map((w, i) =>
      i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()
    )
    .join("");
  const translatedPart =
    t(`menu:ingredients.${camelCase}`) !== `menu:ingredients.${camelCase}`
      ? t(`menu:ingredients.${camelCase}`)
      : cleanedPart;
  return translatedPart + (hasDot ? "." : "");
}

function applyWeight(translatedParts: string[], weight: string): void {
  if (weight && translatedParts.length)
    translatedParts[0] = weight + " " + translatedParts[0];
}

function joinTranslatedParts(translatedParts: string[], t: TFunction): string {
  return translatedParts.length > 1
    ? `${translatedParts.slice(0, -1).join(", ")} ${t(
        "common:and"
      )} ${translatedParts.at(-1)}`
    : translatedParts.join(", ");
}

export default function translateItemDescription(
  description: string,
  t: TFunction
): string | undefined {
  if (!description) return;

  const weight = extractWeight(description);
  const parts = splitAndTrimParts(description, weight);
  const translatedParts = parts.map((part) => translatePart(part, t));

  applyWeight(translatedParts, weight);

  return joinTranslatedParts(translatedParts, t);
}
