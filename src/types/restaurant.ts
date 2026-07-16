export type Restaurant = {
  restaurant: string;
  category: string;
  visited: string;
  lat: string;
  lng: string;

  // future-ready fields
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  notes?: string;
  tags?: string;
  date_added?: string;
};
