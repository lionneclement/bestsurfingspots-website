import {customSlugify} from '../utils/slugify';

export const surfboardLink = ({id, title}: {id: number; title: string}) => {
  return customSlugify(`/surfboard/${id}-${title.replace(/\//g, '-')}`);
};
