export interface HomeCountryIso {
  emoji: string;
  name: string;
  cost_of_livings: {single_person: number}[];
  language_country_isos: {language: {name: string}}[];
  continent: {name: string; id: number};
}
