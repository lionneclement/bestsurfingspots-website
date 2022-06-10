export interface Product {
  price: string;
  location: string;
  description: string;
  size: string;
  title: string;
  id: number;
  picture: string;
}

export interface ProductById {
  id: number;
  price: string;
  location: string;
  description: string;
  size: string;
  title: string;
  url: string;
  picture: string;
  facebook_group: {
    name: string;
    members: number;
    link: string;
    status: string;
    picture: string;
  };
}

export interface ProductByIdVariable {
  id: number;
}
