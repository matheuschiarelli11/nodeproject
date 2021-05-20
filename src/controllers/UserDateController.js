import userInfo from "../models/userInfo";
import { Op } from "sequelize";
import { format } from "date-fns";

class UserDateController {
  async todayInfo(req, res) {
    const { created_at } = req.params;
    const user_id = req.user.id;

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay() - 5;

    const startDate = new Date(year, month, day, 0, 0, 0, 0);

    console.log(startDate);

    const logins = await userInfo.findAll({
      where: {
        user_id: user_id,
        created_at: { [Op.between]: [startDate, new Date()] },
      },
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

  async monthInfo(req, res) {
    const { created_at } = req.params;
    const user_id = req.user.id;

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const startDate = new Date(year, month, 0, 0, 0, 0);

    const logins = await userInfo.findAll({
      where: {
        user_id: user_id,
        created_at: { [Op.between]: [startDate, new Date()] },
      },
    });

    const months = [];
    const loginQty = [];

    for (let i = 0; i < logins.length; i++) {
      const login = logins[i].get({ plain: true });

      const month = format(new Date(login.createdAt), "MM");

      const index = months.indexOf(month);

      if (index < 0) {
        months.push(month);

        const lastPosition = months.length - 1;
        loginQty[lastPosition] = 1;
      } else {
        loginQty[index] += 1;
      }
    }
    return res.status(200).json({ months, loginQty });
  }
}

export default new UserDateController();
