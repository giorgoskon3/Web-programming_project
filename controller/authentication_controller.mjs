import argon2 from 'argon2';

const model = await import(`../model/model-bettersqlite3.mjs`);


export async function doLogin(req, res) {
  const { username, password } = req.body;

  const user = model.getUserByUsername(username);
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid username or password');
  }

  const role = model.getUserRole(user.user_id);
  if (!role) {
    return res.status(403).send('No role assigned to this user');
  }

  let company_id = null;
  if (role === 'employer'){
    const employer = model.getEmployerByUserId(user.user_id);
    company_id = employer.company_id || null
  }

  req.session.user = {
    id: user.user_id,
    username: user.username,
    role: role,
    firstName: user.firstName,
    company_id: company_id || null,
  };

  if (role === 'job_seeker') {
    return res.redirect('/job-seeker');
  } else if (role === 'employer') {
    return res.redirect('/employer');
  }
}

export function doLogout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

export async function doRegister(req, res) {
  const {
    firstName, lastName, username, email, password,
    location, phone, role,
    companyName, companyDesc, companyLocation, cv
  } = req.body;

  const hashedPassword = await argon2.hash(password);

  // Έλεγχος αν υπάρχει ο χρήστης
  const existingUser = model.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  const newUser = model.createUser({
    firstName, lastName, username, email,
    password: hashedPassword, location, phone
  });

  const user_id = newUser.lastInsertRowid;

  if (role === 'employer') {
    // Check if company exists
    let company = model.getCompanyByName(companyName);
    let company_id;

    if (!company) {
      const newCompany = model.createCompany({
        name: companyName,
        description: companyDesc,
        location: companyLocation
      });
      company_id = newCompany.lastInsertRowid;
      if (!company_id) {
        company_id = 1;
      }
    } else {
      company_id = company.company_id;
    }

    // Δημιουργία employer
    model.createEmployer({ user_id, company_id });

  } else if (role === 'job_seeker') {
    // Δημιουργία job seeker
    model.createJobSeeker({ user_id , cv});
  }

  res.redirect('/');
}

export function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

export function checkRole(expectedRole) {
  return function (req, res, next) {
    if (!req.session.user || req.session.user.role !== expectedRole) {
      return res.redirect('/');
    }
    next();
  };
}

