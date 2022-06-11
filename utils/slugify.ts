import originalSlugify from 'slugify';

const removeMatcher = /[*+~.()'"!:@,\\]|[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu;

export const customSlugify = (string: string): string => {
  return originalSlugify(string, {remove: removeMatcher, lower: true, locale: 'us'});
};
