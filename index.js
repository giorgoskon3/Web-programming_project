import express from 'express';
import exphbs from 'express-handlebars';
import router from './routes/router.mjs';

const app = express();
const port = 3000;

// Set view engine
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Static files (CSS, JS)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
