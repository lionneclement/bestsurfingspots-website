export interface Product {
  price: string;
  location: string;
  description: string;
  size: string;
  title: string;
  id: number;
  picture: string;
  product_pictures: {
    url: string;
  }[];
}

export interface ProductById {
  id: number;
  visit: number;
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
    description: string;
  };
  product_pictures: {
    url: string;
  }[];
}

export interface ProductByIdVariable {
  id: number;
}

export interface ProductBySizeVariable {
  size: string;
  id: number;
}

export interface ProductSitemap {
  id: number;
  title: string;
  updated_at: Date;
}

export interface UpdateVisitProduct {
  id: number;
  visit: number;
}

export interface ProductSize {
  size: string;
}
