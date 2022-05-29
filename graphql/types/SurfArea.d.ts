export interface SurfAreaById {
  name: string;
  surf_spots?: {
    name: string;
    solid_rating?: null | number;
  }[];
}

export interface SurfAreaByIdVariable {
  surfAreaId: number;
}

export interface SurfAreaSiteMap {
  name: string;
  id: number;
}
