import { Modifier, ModifierItem } from "./types";

export function formatPrice(price: number) {
  return `R$${price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function findMatchingModifier(
  modifierId?: number,
  modifier?: Modifier[]
) {
  if (!modifierId || !modifier) {
    return undefined;
  }

  let foundModifier: ModifierItem | undefined;

  modifier.find(
    (mod) => (foundModifier = mod.items.find((item) => item.id === modifierId))
  )?.items;

  return foundModifier;
}
