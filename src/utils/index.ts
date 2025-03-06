import { Modifier, ModifierItem } from "../types";
import applyThemeAndMetaTags from "./applyThemeAndMetaTags";
import translateItemDescription from "./translateItemDescription";

function formatPrice(price: number, currency?: string) {
  const locale = localStorage.getItem("i18nextLng") ?? "en-US";

  return `${currency ?? "$"}${price.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function findMatchingModifier(
  modifierId?: number,
  modifiers?: Modifier[]
): ModifierItem | undefined {
  if (!modifierId || !modifiers) {
    return undefined;
  }

  for (const modifier of modifiers) {
    const foundItem = modifier.items.find((item) => item.id === modifierId);
    if (foundItem) {
      return foundItem;
    }
  }

  return undefined;
}

export {
  applyThemeAndMetaTags,
  findMatchingModifier,
  formatPrice,
  translateItemDescription,
};
