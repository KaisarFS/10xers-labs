const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      if(!username) throw { name: 'Username is required'};
      if(!password) throw { name: 'Password is required'};

      const findUser = await User.findOne({ where: { username } });
      if(findUser) res.status(409).json({ message: 'Username already exists' });
      
      const newUser = await User.create({ username, password, role: 'Admin'});
      res.status(201).json({ 
        message: 'Success creating new account!', 
        newUser
      });

    } catch (error) {
      // console.error(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if(!username) throw { name: 'Username is required'};
      if(!password) throw { name: 'Password is required'};

      const user = await User.findOne({ where: { username } });
      if(!user) return res.status(404).json({ message: 'Account not found' });
      if(!comparePassword(password, user.password)) throw { name: 'Invalid username/password' };

      const accessToken = createToken({ id: user.id });
      res.status(200).json({ username: user.username, accessToken})
      
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UserController;