export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Vendor {
  id: number;
  name: string;
  category: string;
  city: string;
  state: string;
  rating: number;
  contact: string;
  image: string;
}

export interface Hall {
  id: number;
  name: string;
  city: string;
  capacity: number;
  price_per_day: number;
  type: string;
  ac: string;
  image: string;
}

export interface FashionItem {
  id: number;
  name: string;
  category: string;
  price: number;
  designer: string;
  rating: number;
  image: string;
  trending: boolean;
}

export interface Booking {
  id: number;
  user_id: number;
  item_id: number;
  item_type: string;
  booking_date: string;
  status: string;
  item_name?: string;
}
