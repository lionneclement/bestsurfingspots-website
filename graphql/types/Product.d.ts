export interface Product {
  price: number;
  location: string;
  description: string;
  size_string: string;
  title: string;
  url: string;
  volume?: number;
  picture?: string;
  product_pictures: {
    url: string;
  }[];
}
