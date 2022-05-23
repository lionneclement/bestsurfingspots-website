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
