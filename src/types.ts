export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: "Soldout" | string;
}

export interface Blog {
  id: string;
  title: string;
  date: string;
  image: string;
  author: string;
  snippet: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
