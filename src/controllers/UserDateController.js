import userInfo from "../models/userInfo";
import { Op } from "sequelize";
import { format } from "date-fns";

class UserDateController {
  async info(req, res) {
    const { user_id, created_at, updated_at } = req.params;

    const findInfo = await userInfo.findOne(user_id, created_at, updated_at);

    if (findInfo) {
      return res.status(200).json(findInfo);
    }
  }

  async todayInfo(req, res) {
    const { created_at } = req.params;

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay() - 5;

    const startDate = new Date(year, month, day, 0, 0, 0, 0);

    console.log(startDate);

    const logins = await userInfo.findAll({
      where: { created_at: { [Op.between]: [startDate, new Date()] } },
    });

    const days = [];
    const loginQty = [];

    for (let i = 0; i < logins.length; i += 1) {
      const login = logins[i].get({ plain: true });

      const day = format(new Date(login.createdAt), "dd/MM");

      const index = days.indexOf(day);

      if (index < 0) {
        days.push(day);

        const lastPosition = days.length - 1;

        loginQty[lastPosition] = 1;
      } else {
        loginQty[index] += 1;
      }
    }

    return res.status(200).json({ days, loginQty });
  }
}

export default new UserDateController();
