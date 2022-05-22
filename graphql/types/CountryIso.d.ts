export interface HomeCountryIso {
  id: number;
  emoji: string;
  name: string;
  cost_of_livings: {single_person: number}[];
  language_country_isos: {language: {name: string}}[];
  continent: {name: string; id: number};
}

export interface CountryIsoById {
  emoji: string;
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
