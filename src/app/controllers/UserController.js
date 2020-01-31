import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (user) {
        return res.status(400).send({ error: 'This user already exists' });
      }

      const { id, name, email, provider } = await User.create(req.body);

      return res.status(201).send({
        id,
        name,
        email,
        provider,
      });
    } catch (err) {
      return res.send({
        error: {
          title: 'Create user failed',
          messages: err.inner.map(mes => mes.message),
        },
      });
    }
  }

  async delete(req, res) {
    try {
      await User.destroy({
        where: { id: req.userId },
      });

      return res.send();
    } catch (err) {
      return res.send({
        error: {
          title: 'Delete user failed',
          messages: err.inner.map(mes => mes.message),
        },
      });
    }
  }

  async update(req, res) {
    try {
      return res.send({ ok: true });
    } catch (err) {
      return res.send({
        error: {
          title: 'Update user failed',
          messages: err.inner.map(mes => mes.message),
        },
      });
    }
  }
}

export default new UserController();
