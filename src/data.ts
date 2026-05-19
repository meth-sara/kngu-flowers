import { Product, Blog, Expert } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Spring Snowflake",
    price: 5700,
    originalPrice: 6000,
    rating: 4,
    badge: "Soldout",
    image: "/src/assets/images/regenerated_image_1779162810748.jpg"
  },
  {
    id: "2",
    name: "Rock Soapwort",
    price: 15000,
    rating: 5,
    image: "/src/assets/images/regenerated_image_1779162833379.jpg"
  },
  {
    id: "3",
    name: "Scarlet Sage",
    price: 11700,
    originalPrice: 18000,
    rating: 4,
    badge: "-35%",
    image: "/src/assets/images/regenerated_image_1779162845121.jpg"
  },
  {
    id: "4",
    name: "Foxglove Flower",
    price: 23700,
    rating: 5,
    image: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "5",
    name: "Lity Majesty Palm",
    price: 5700,
    originalPrice: 8700,
    rating: 4,
    badge: "-34%",
    image: "/src/assets/images/regenerated_image_1779162857259.jpg"
  },
  {
    id: "6",
    name: "Wild Roses",
    price: 5700,
    originalPrice: 6300,
    rating: 4,
    badge: "-10%",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "7",
    name: "Rock Soapwort",
    price: 16500,
    originalPrice: 22500,
    rating: 4,
    badge: "-27%",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "8",
    name: "Summer Savory",
    price: 12000,
    originalPrice: 25500,
    rating: 4,
    badge: "-53%",
    image: "/src/assets/images/regenerated_image_1779162876478.jpg"
  }
];

export const BLOGS: Blog[] = [
  {
    id: "1",
    title: "Flower Beauty",
    date: "August 12, 2022",
    author: "Shopify Team HasTheme",
    image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?auto=format&fit=crop&q=80&w=600",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: "2",
    title: "Local Florists",
    date: "August 14, 2022",
    author: "Shopify Team HasTheme",
    image: "https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?auto=format&fit=crop&q=80&w=600",
    snippet: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
  },
  {
    id: "3",
    title: "Flower Power",
    date: "August 16, 2022",
    author: "Shopify Team HasTheme",
    image: "/src/assets/images/regenerated_image_1779162891138.jpg",
    snippet: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus."
  }
];

export const EXPERTS: Expert[] = [
  {
    id: "1",
    name: "Marcos Alonso",
    role: "Biologist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "2",
    name: "Shara friken",
    role: "Photographer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "3",
    name: "Torvi greac",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "4",
    name: "Alonso Gomej",
    role: "Florist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  }
];
