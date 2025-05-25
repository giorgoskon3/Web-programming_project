import argon2 from 'argon2';

const model = await import(`../model/model-bettersqlite3.mjs`);

export async function doLogin(req, res) {
    const { username, password } = req.body;
    const user = model.getUserByUsername(username);

    if (!user) {
        console.error('User not found:', username);
        return res.redirect('/');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
        req.session.user = {
            id: user.user_id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };
        res.redirect('/');
    } else {
        res.status(401).send('Invalid username or password');
    }
}

export function doLogout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

export async function doRegister(req, res) {
    const { firstName, lastName, username, email, password, location, phone, role } = req.body;

    const hashedPassword = await argon2.hash(password);
    // Check if the user already exists
    const existingUser = model.getUserByUsername(username);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }
    // Create a new user
    const newUser = model.createUser({ firstName, lastName, username, email, password: hashedPassword, location, phone, role });
    res.redirect('/');
}

export function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

export function checkRole(role) {
  return function (req, res, next) {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.redirect('/');
    }
  };
}
