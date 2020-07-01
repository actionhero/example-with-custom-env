import asyncConfig from "../../src/modules/asyncConfig";
import { Process, config } from "actionhero";
const actionhero = new Process();
let api;

describe("actionhero Tests", () => {
  beforeAll(async () => {
    api = await actionhero.start();
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test("asyncConfig can be run and modify env", async () => {
    await asyncConfig();
    expect(process.env.FAVORITE_HERO).toEqual("BATMAN");
  });
});
