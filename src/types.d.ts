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
