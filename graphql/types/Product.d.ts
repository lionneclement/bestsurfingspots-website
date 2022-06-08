export interface Product {
  price: number;
  location: string;
  description: string;
  size: number;
  title: string;
  url: string;
  volume?: number;
  product_pictures: {
    url: string;
  }[];
}
