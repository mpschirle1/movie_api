const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');
const { get } = require('lodash');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

let topMovies = [
  // In NO particular order...
  {
    title: 'Fight Club',
    director: 'David Fincher',
    year: '1999'
  },
  {
    title: 'A Clockwork Orange',
    director: 'Stanley Kubrick',
    year: '1971'
  },
  {
    title: 'Network',
    director: 'Sidney Lumet',
    year: '1976'
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    director: 'Irvin Kershner',
    year: '1980'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994'
  },
  {
    title: 'The Matrix',
    director: 'Lana Wachowski & Lilly Wachowski',
    year: '1999'
  },
  {
    title: 'The Sandlot',
    director: 'David Mickey Evans',
    year: '1993'
  },
  {
    title: 'Apocalypse Now',
    director: 'Francis Ford Coppola',
    year: '1979'
  },
  {
    title: 'Airplane!',
    director: 'Jim Abrahams, David Zucker & Jerry Zucker',
    year: '1980'
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something broke!');
})

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
});