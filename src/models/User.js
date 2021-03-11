import Sequelize from "sequelize";
import bcrypt from "bcrypt";

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
