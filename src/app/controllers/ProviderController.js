import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    try {
      const providers = await User.findAll({
        where: {
          provider: true,
        },
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.status(200).send(providers);
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  }
}

export default new ProviderController();
