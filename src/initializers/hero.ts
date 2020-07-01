import { Initializer, config, log } from "actionhero";

export class MyInitializer extends Initializer {
  constructor() {
    super();
    this.name = "hero";
  }

  async initialize() {
    log(`Loaded favorite hero: ${config.hero.favorite}`, "warning");
  }
}
