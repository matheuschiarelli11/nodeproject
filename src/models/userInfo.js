import Sequelize from "sequelize";

class userInfo extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
}

export default userInfo;
