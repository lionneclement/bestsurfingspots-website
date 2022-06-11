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
    description: string;
  };
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
