import dotenv from "dotenv";

export default class Config{
    static #env = process.env.NODE_ENV;

    static load = () => {
    dotenv.config({
      path: `.env${Config.#env !== "prod" ? `.${Config.#env}` : ``}`,
    });
  };
}