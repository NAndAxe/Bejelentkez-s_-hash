import express from 'express'
import * as db from './data/database.js'
import cors from "cors";
import bcrypt from "bcrypt";

const PORT = 2005;
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"));
                      
app.post("/registration", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password ) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedUser = await db.createUser(email, password);
        if (savedUser.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(201).json({ id: savedUser.lastID, password})
    } catch (error) {
        console.error("Registration error :", error)
        res.status(500).json({ message: "Error: " + error })
    }
})

app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Data missing" });
      }
      const user = await db.dbGet("SELECT * FROM users WHERE email = ?", [email]);
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      if (user.password != password) {
        return res.status(401).json({ message: "Bad password" });
      }
  
      res.status(200).json({ message: "Login is done", id: user.id, email: user.email });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error: ", error});
    }
  });


app.listen(PORT, () => console.log("Runs at " + PORT))