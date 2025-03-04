interface Image {
  id: number;
  image: string;
}

interface ModifierItem {
  id: number;
  name: string;
  price: number;
  maxChoices: number;
  position: number;
  visible?: number;
  availabilityType: "AVAILABLE_NOW";
  available: boolean;
  qty?: number;
}

interface Modifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: ModifierItem[];
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  alcoholic: 0 | 1;
  price: number;
  position: number;
  visible?: number;
  availabilityType: "AVAILABLE_NOW";
  sku: string;
  images?: Image[];
  available: boolean;
  modifiers?: Modifier[];
}

interface Section {
  id: number;
  name: string;
  description?: string;
  position: number;
  visible?: number;
  images?: Image[];
  items: Item[];
}

export interface Menu {
  id: number;
  name: string;
  type: "MENU";
  collapse: 0 | 1;
  sections: Section[];
}

export interface CartState {
  items: CartItem[];
  selectedItem?: Item;
  totalPrice: number;
}

export interface RootState {
  cart: CartState;
}

export type CartItem = Item & {
  selectedModifierId?: number;
  unitPrice: number;
  quantity: number;
};

export type RemoveItemAction = {
  id: number;
  modifierId?: number;
};

export type UpdateQuantityAction = {
  id: number;
  modifierId?: number;
  type: "decrement" | "increment" | "customIncrement";
  quantity?: number;
};
