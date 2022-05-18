import {isProduction} from '../helpers/Env';

export const logError = (error: unknown): void => {
  !isProduction() && console.error(error);
};
