const express = require('express');

const app = express();

app.use(express.static('public'));

// pour le formulaire et le body (extended est le format par defaut employé par les navigateurs)
app.use(express.urlencoded({extended: true}));

let ejs = require('ejs');

app.set('view engine', 'ejs');

app.set('views', './public/views');

const PORT = 3000;

const route = require('./public/route');

app.use(route);

app.listen(PORT, () => {
    console.log(`server live on http://localhost:${PORT}`);
})