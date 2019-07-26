import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetups from '../models/Meetups';
import User from '../models/User';

class ListMeetupsController {
  async index(req, res) {
    const user = Meetups.user_id;
    const checkUser = await Meetups.findOne({
      where: { id: user },
      attributes: ['title'],
    });

    return res.json(checkUser);
  }
}

export default new ListMeetupsController();
