const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


//Define paths for express config
const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to server
app.use(express.static(directoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rayyan Bawiani'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rayyan Bawiani'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rayyan Bawiani',
        helpText: 'This is some helpful text!'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You have to provide a search item!'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecasstData,
                location,
                address: req.query.address
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rayyan Bawiani',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rayyan Bawiani',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});