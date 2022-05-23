export interface SurfAreaById {
  name: string;
  country: {
    name: string;
  };
  country_seasons?: {
    season: {
      name: string;
    };
    month: {
      name: string;
    };
  }[];
  surf_spots?: {
    name: string;
    solid_rating: null | number;
    level_surf_spots?: {
      level: {
        name: stting;
      };
    }[];
  }[];
}

export interface SurfAreaByIdVariable {
  surfAreaId: number;
}
