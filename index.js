const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
const { get } = require('lodash');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Biff",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Barb",
    favoriteMovies: ["Pulp Fiction"]
  }
];

let movies = [
  // In NO particular order...
  {
    Title: "Fight Club",
    Genre: {
      Name: "Drama",
      Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
      Name: "David Fincher",
    },
    Year: "1999"
  },
  {
    Title: "A Clockwork Orange",
    Genre: {
      Name: "Crime",
      Description: "Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a crime, often a murder."
    },
    Director: {
      Name: "Stanley Kubrick",
    },
    Year: "1971"
  },
  {
    Title: "Network",
    Genre: {
      Name: "Drama",
      Description:"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
      Name: "Sidney Lumet",
    },
    Year: "1976"
  },
  {
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
    },
    Director: {
      Name: "Irvin Kershner",
    },
    Year: "1980"
  },
  {
    Title: "Interstellar",
    Genre: {
      Name: "Sci-Fi",
      Description: "Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
    },
    Director: {
      Name: "Christopher Nolan",
    },
    Year: "2014"
  },
  {
    Title: "Pulp Fiction",
    Genre: {
      Name: "Crime",
      Description: "Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a crime, often a murder."
    },
    Director: {
      Name: "Quentin Tarantino",
    },
    Year: "1994"
  },
  {
    Title: "The Matrix",
    Genre: {
      Name: "Sci-Fi",
      Description:"Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
    },
    Director: {
      Name: "Lana Wachowski & Lilly Wachowski",
    },
    Year: "1999"
  },
  {
    Title: "The Sandlot",
    Genre: {
      Name: "Comedy",
      Description:"Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered. These classifications overlap, and most comedians can fit into multiple genres."
    },
    Director: {
      Name: "David Mickey Evans",
    },
    Year: "1993"
  },
  {
    Title: "Apocalypse Now",
    Genre: {
      Name: "Drama",
      Description:"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    Director: {
      Name: "Francis Ford Coppola",
    },
    Year: "1979"
  },
  {
    Title: "Airplane!",
    Genre: {
      Name: "Comedy",
      Description:"Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered. These classifications overlap, and most comedians can fit into multiple genres."
    },
    Director: {
      Name: "Jim Abrahams, David Zucker & Jerry Zucker",
    },
    Year: "1980"
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
})

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('User must have a name')
  }
})

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found')
  }
})

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${user.name}'s favorites`);
  } else {
    res.status(400).send('User not found')
  }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from ${user.name}'s favorites`);
  } else {
    res.status(400).send('User not found')
  }
})

// DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`${user.name} has been deregistered`);
  } else {
    res.status(400).send('User not found')
  }
})

// READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params; // Object destructuring
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found")
  }
})

// READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found")
  }
})

// READ
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found")
  }
})



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something broke!');
})

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
})