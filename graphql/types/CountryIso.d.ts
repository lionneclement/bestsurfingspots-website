export interface HomeCountryIso {
  id: number;
  emoji: string;
  name: string;
  cost_of_livings: {single_person: number}[];
  language_country_isos: {language: {name: string}}[];
  continent: {name: string; id: number};
}

export interface CountryIsoById {
  image: string;
  emoji: string;
  peace: number;
  population: number | null;
  mobile_speed: number | null;
  broadband_speed: number | null;
  continent: {name: string};
  name: string;
  language_country_isos: {language: {name: string}}[];
  cost_of_livings: {
    beer: number;
    cigarettes: number;
    coffee: number;
    dinner: number;
    family: number;
    single_person: number;
  }[];
  countries: {
    name: string;
    surf_areas: {
      id: number;
      name: string;
      surf_spots_aggregate: {
        aggregate: {
          count: number;
        };
      };
    }[];
  }[];
}

export interface CountryIsoByIdVariable {
  countryId: number;
}
