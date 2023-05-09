const database = require("./database");

const getUsers = (req, res) => {
  const language = req.query.language
  const city = req.query.city
  let request = "select * from users"
  let requestData = []

  if (language) {
    request += " where language =?"
requestData.push(language)
    if (city) {
request += " and city = ?"
requestData.push(city)
    }
  }

  else if (city) {
    request += " where city = ?"
    requestData.push(city)
  }

    database
      .query(request,requestData)
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const postUsers = (req, res) => {
    const { firstname,lastname,email,city,language } = req.body;
    database
    .query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, email ,city, language])
    .then(([result]) => {
      res.location(`/api/users${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error posting data from database");
    });
  };

  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
     if(users[0]) {res.json(users[0])}
     else {
       res.status(404).send("Not Found")}
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const putUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname,lastname,email,city,language } = req.body;
    database
      .query("update users set firstname= ?, lastname= ?, email= ?, city= ?, language= ? where id = ?",
       [firstname,lastname,email,city,language, id])
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


  const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
      database
      .query("DELETE FROM USERS WHERE id = ?;",
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
        res.status(500).send("Error deleting user");
      });
  };


  module.exports = {
    getUsers,
    getUserById,    
    postUsers,
    putUserById,
    deleteUserById,
  };