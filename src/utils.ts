import { Modifier, ModifierItem } from "./types";

export function formatPrice(price: number) {
  return `R$${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function findMatchingModifier(
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
