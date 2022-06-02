import {continentData, ContinentDataTypes, costOfLivingData, CostOfLivingDataTypes} from '../data/TableData';
import {customSlugify} from '../utils/slugify';

export const continentFilterPath = (slug: string[] | string | undefined): ContinentDataTypes[] => {
  return continentData.filter(({name}) => slug?.includes(customSlugify(name)));
};

export const costOfLivingFilterPath = (slug: string[] | string | undefined): CostOfLivingDataTypes[] => {
  return costOfLivingData.filter(({slugify}) => slugify && slug?.includes(slugify));
};

export interface HomeFilterPathTypes {
  continent?: ContinentDataTypes;
  costOfLiving?: CostOfLivingDataTypes;
}

export const homeFilterPath = (slug: string[] | string | undefined): HomeFilterPathTypes | null => {
  const continent = continentFilterPath(slug);
  const costOfLiving = costOfLivingFilterPath(slug);

  if (continent.length > 0 && costOfLiving.length > 0) {
    if (slug === customSlugify(`${costOfLiving[0].slugify}-in-${continent[0].name}`)) {
      return {continent: continent[0], costOfLiving: costOfLiving[0]};
    }
    return null;
  }

  if (continent.length > 0) {
    if (slug === customSlugify(continent[0].name)) {
      return {continent: continent[0]};
    }
    return null;
  }
  if (costOfLiving.length > 0) {
    if (slug === costOfLiving[0].slugify) {
      return {costOfLiving: costOfLiving[0]};
    }
    return null;
  }
  return null;
};

export const homePathName = ({
  continentSelected,
  costOfLivingSelected
}: {
  continentSelected: ContinentDataTypes;
  costOfLivingSelected: CostOfLivingDataTypes;
}): string => {
  if (continentSelected.id > 0 && costOfLivingSelected.id > 0)
    return `/${costOfLivingSelected.slugify}-in-${customSlugify(continentSelected.name)}`;

  if (continentSelected.id > 0) return ` /${customSlugify(continentSelected.name)}`;
  if (costOfLivingSelected.id > 0 && costOfLivingSelected.slugify) return costOfLivingSelected.slugify;
  return '';
};
