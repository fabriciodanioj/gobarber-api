import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (user) {
        return res.status(400).send({ error: 'This user already exists' });
      }

      const { id, name, email, provider } = await User.create(req.body);

      return res.send({
        id,
        name,
        email,
        provider,
      });
    } catch (error) {
      return res.send(error);
    }
  }
}

export default new UserController();
