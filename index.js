const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

const db = new sqlite3.Database("./Database/SQTeamFootball.sqlite");

app.use(express.json());


db.run(`CREATE TABLE IF NOT EXISTS players (player_id INTEGER PRIMARY KEY,
				name TEXT , number INTRGER  )`);

db.run(`CREATE TABLE IF NOT EXISTS teams (team_id INTEGER PRIMARY KEY,
  team_name TEXT)`);



db.run(`CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY,
  player_id INTEGER NOT NULL,team_id INTEGER NOT NULL ,score INTRGER ,
FOREIGN KEY(player_id) REFERENCES players(player_id) , 
FOREIGN KEY(team_id) REFERENCES teams(team_id))`);



// ดึงข้อมูล
// ดูข้อมูลทั้งหมด
app.get("/players", (req, res) => {
  db.all("SELECT * FROM players ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("players not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/players/:id", (req, res) => {
  db.get("SELECT * FROM players WHERE player_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("players not found");
      } else {
        res.json(row);
      }
    }
  });
});


//ส่วนนี้บอสทำต่อให้จนเสร็จละ คือการเพิ่มข้อมูล
app.post("/players", (req, res) => {
  const players = req.body;
  db.run(
    "INSERT INTO players (number,name) VALUES (?,?)",
    players.number,players.name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        players.id = this.lastID;
        res.send(players);
        res.status(200);
      }
    }
  );
});



//ส่วนแก้ไข
app.put("/players/:id", (req, res) => {
  console.log(req.params.id);
  const players = req.body;
  db.run(
    "UPDATE players SET number = ? , name = ? WHERE player_id = ? ",
    players.number,
    players.name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(players);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/players/:id", (req, res) => {
  db.run("DELETE FROM players WHERE player_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// province

app.get("/teams", (req, res) => {
  db.all("SELECT * FROM teams ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("teams not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/teams/:id", (req, res) => {
  db.get("SELECT * FROM teams WHERE team_id = ? ", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("teams not found");
      } else {
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/teams", (req, res) => {
  const teams = req.body;
  db.run(
    "INSERT INTO teams (team_name) VALUES (?)",
    teams.team_name,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        teams.id = this.lastID;
        res.send(teams);
        res.status(200);
      }
    }
  );
});



//ส่วนแก้ไข
app.put("/teams/:id", (req, res) => {
  console.log(req.params.id);
  const teams = req.body;
  db.run(
    "UPDATE teams SET team_name = ?  WHERE team_id = ? ",
    teams.team_name,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(teams);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/teams/:id", (req, res) => {
  db.run("DELETE FROM teams WHERE team_id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});



// school_province

app.get("/scores", (req, res) => {
  db.all("SELECT * FROM scores ",(err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("scores not found");
      } else {
        res.json(row);
      }
    }
  });
});

// ดูข้อมูลด้วย id
app.get("/scores/:id", (req, res) => {
  console.log("get")
  db.get("SELECT * FROM scores WHERE id = ? ", req.params.id, (err, row) => {
    
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("scores not found");
      } else {
        console.log(row)
        res.json(row);
      }
    }
  });
});



//เพิ่มข้อมูล
app.post("/scores", (req, res) => {
  const score = req.body;
  db.run(
    "INSERT INTO scores (player_id , team_id,score) VALUES (?, ?, ?)",
    scores.player_id,
    scores.team_id,
    scores.score,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        
        scores.id = this.lastID;
        res.send(scores);
        res.status(200);
      }
    }
  );
});


//ส่วนแก้ไข
app.put("/scores/:id", (req, res) => {
  console.log(req.params.id);
  const scores = req.body;
  db.run(
    "UPDATE scores SET player_id = ?, team_id = ?,score = ?  WHERE id = ? ",
    scores.player_id,
    scores.team_id,
    scores.score,
    req.params.id,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(scores);
      }
    }
  );
});


//ลบไปทำเอาเอง
app.delete("/scores/:id", (req, res) => {
  db.run("DELETE FROM scores WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));