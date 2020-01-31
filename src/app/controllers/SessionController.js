import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).send({
          error: 'User not found',
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).send({ error: 'Password does not match' });
      }

      const { id, name } = user;

      return res.status(200).send({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.send({
        error: {
          title: 'User auth failed',
          messages: err.inner.map(mes => mes.message),
        },
      });
    }
  }
}

export default new SessionController();
