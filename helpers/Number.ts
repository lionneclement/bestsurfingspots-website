export const memberFormatter = (member: number): string => {
  if (member >= 1000000000) {
    return (member / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (member >= 1000000) {
    return (member / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (member >= 1000) {
    return (member / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return member.toString();
};

export const round5 = (x: number) => {
  return Math.ceil(x / 5) * 5;
};
