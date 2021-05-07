import Sequelize, { Model } from "sequelize";

import User from "../models/User";
import databaseConfig from "../config/database";
import userInfo from "../models/userInfo";

const models = [User, userInfo];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((models) => models.init(this.connection));
  }
}

export default new Database();
