const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Index page
app.get('/', (req, res) => {
  res.render('index')
});

//Register Page
app.get('/register', (req, res) => {
  res.render('register');
});

// App will be served in localhost:3000
app.listen(3000, () => console.log('App listening on port 3000!'));