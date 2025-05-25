import express from 'express';
import exphbs from 'express-handlebars';
import router from './routes/router.mjs';
import expSession from 'express-session';
import sessionMiddleware from './app-setup/app-setup-session.mjs';

const app = express();
const port = 3000;

// Set view engine
app.engine('hbs', exphbs.engine({
   extname: '.hbs', defaultLayout: 'main', helpers: {
      ifEquals: function (a, b, options) {
         return a == b ? options.fn(this) : options.inverse(this);
      }
   }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// // Middleware for session management
app.use(expSession(sessionMiddleware));
// Middleware to set userId in res.locals for templates
app.use((req, res, next) => {
   if (req.session) {
      res.locals.userId = req.session.loggedUserId;
   } else {
      res.locals.userId = null;
   }
   next();
});

// Static files (CSS, JS)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
   res.locals.user = req.session.user || null;
   next();
});

// Use routes
app.use('/', router);

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
