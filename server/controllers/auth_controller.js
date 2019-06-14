const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const { session } = req;

    let takenEmail = await db.auth.check_email({ email });
    takenEmail = +takenEmail[0].count;

    if (takenEmail) {
      return res.status(409).send("Email already exists");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let user = await db.auth.add_user({ email, password: hash });

    user = user[0];
    session.user = user;

    res.status(200).send(session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const { session } = req;

    let user = await db.auth.get_user({ email });

    user = user[0];

    if (!user) {
      return res.status(409).send("Email does not exist");
    }

    let authenticated = bcrypt.compareSync(password, user.password);

    if (authenticated) {
      delete user.password;
      session.user = user;
      res.status(200).send(session.user);
    } else {
      res.status(401).send("Failed Authentication");
    }
  },

  current: (req, res) => {
    const { user } = req.session;
    if (user) {
      return res.status(200).send(user);
    } else {
      res.status(400).send("User not found");
    }
  },

  logout: (req, res) => {
    req.session.destroy();

    res.status(200).send("Logged Out");
  }
};
