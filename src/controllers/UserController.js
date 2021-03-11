import User from "../models/User";
import bcrypt from "bcrypt";

class UserController {
  async index(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ message: "erro" });
    }

    if (!email) {
      return res.status(400).json({ message: "erro" });
    }

    if (!password) {
      return res.status(400).json({ message: "erro" });
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 8),
    });

    return res.status(200).json({ message: "Usuário criado" });
  }

  async show(req, res) {
    const { email } = req.body;

    const userFound = await User.findOne({ where: { email } });

    if (userFound) {
      return res.status(200).json(userFound);
    }
  }

  async update(req, res) {
    const { email, name, password, newPass } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário inexistente." });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password && newPass) {
      console.log(password, user.password);
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciais incorretas." });
      }
      user.password = newPass;
    }

    await user.save();

    return res.status(200).json(user);
  }

  async delete(req, res) {
    const { email } = req.body;

    const user = await User.destroy({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não existe" });
    }

    return res.status(200).json({ message: "Usuário deletado" });
  }
}

export default new UserController();
