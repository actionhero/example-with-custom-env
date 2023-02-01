const namespace = "hero";

declare module "actionhero" {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<(typeof DEFAULT)[typeof namespace]>;
  }
}

export const DEFAULT = {
  [namespace]: () => {
    return {
      favorite: process.env.FAVORITE_HERO,
    };
  },
};
