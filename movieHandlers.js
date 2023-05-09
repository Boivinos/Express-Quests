const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
  .query("INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
  [title, director, year, color, duration])
  .then(([result]) => {
    res.location(`/api/movies${result.insertId}`).sendStatus(201)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error posting data from database");
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
   if(movies!=null) {res.json(movies)}
   else {
     res.status(404).send("Not Found")}
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const putMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  database
    .query("update movies set title= ?, director= ?, year= ?, color= ?, duration= ? where id = ?",
     [title, director, year, color, duration, id])
     .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing movie");
    });
};

const deleteMovieById = (req, res) => {
  const id = parseInt(req.params.id);
    database
    .query("DELETE FROM MOVIES WHERE id = ?;",
     [id])
     .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting movie");
    });
};


module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovieById,
  deleteMovieById,
};
