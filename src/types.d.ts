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

export interface VenueState {
  data: VenueData | null;
}

export interface RootState {
  cart: CartState;
  venue: VenueState;
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

export type Device = "mobile" | "tablet" | "laptop" | "desktop";

interface VenueData {
  id: number;
  name: string;
  internalName: string;
  description: string | null;
  liveFlag: number;
  demoFlag: number;
  address1: string;
  address2: string;
  address3: string | null;
  city: string;
  county: string;
  postcode: string;
  country: string;
  timezoneOffset: string;
  locale: string;
  timeZone: string;
  webSettings: WebSettings;
  ccy: string;
  ccySymbol: string;
  currency: string;
}

interface WebSettings {
  id: number;
  venueId: number;
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}
