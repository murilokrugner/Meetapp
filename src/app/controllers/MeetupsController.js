import * as Yup from 'yup';
import Meetups from '../models/Meetups';

class MeetupsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().require(),
      description: Yup.string().require(),
      location: Yup.string().require(),
      date: Yup.number().require(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date } = req.body;

    const meetups = await Meetups.create({
      title,
      description,
      location,
      date,
    });

    return res.json(meetups);
  }
}

export default new MeetupsController();
