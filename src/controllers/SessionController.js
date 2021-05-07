import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";
import userInfo from "../models/userInfo";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Wrong credentials" });
    }

    const { id, name } = user;

    await userInfo.create({
      user_id: id,
    });

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
