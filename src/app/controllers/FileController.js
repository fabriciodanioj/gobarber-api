import File from '../models/File';

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });

      return res.status(200).send(file);
    } catch (err) {
      return res.send({
        error: {
          title: 'Store file failed',
        },
      });
    }
  }
}
export default new FileController();
