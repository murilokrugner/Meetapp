import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Meetups from '../models/Meetups';
import User from '../models/User';
import Notification from '../schemas/Notification';


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

    const { originalname: name, filename: path } = req.file;

    const user = await User.findByPk(req.user_id);

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const meetups = await Meetups.create({
      title,
      description,
      location,
      date,
      name,
      path,
    });

    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo evento de ${user.name} para ${formattedDate}`,
      user,
    });

    return res.json(meetups);
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user_id !== user ) {
      const userExists = await User.findOne({
        where: { user_id },
      });

      if (userExists) {
        return res.status(400).json({ error: "You don't have permission to update this schedule" });
      }
    }

    const { title, description, location, date } = await Meetups.update(req.body);

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'You cannot change closed schedules '})
    }

    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

      await Notification.create({
        content: `Uma alteração foi feita para o evento de ${user.name}`,
        user,
      });

      return res.json({
        title,
        description,
        location,
        date,
      });
  }
}

export default new MeetupsController();
