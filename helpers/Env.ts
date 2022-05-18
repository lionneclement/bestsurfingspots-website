export const isProduction = (): boolean => {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';
};

export const isDev = (): boolean => {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV';
};
