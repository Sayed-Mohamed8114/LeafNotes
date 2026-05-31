import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import bcrypt from "bcrypt";
import User from "./models/users.models.js";
import Note from "./models/notes.models.js";
import authenticationToken from "./utilites.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

// frontend uri
const allowedOrigin = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

//routes
// main route
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// sign up
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "All fields must be done please to create the account..",
    });
  }
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        error: true,
        message: "this user is already exit try to sign in instead",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600m",
      },
    );

    return res.status(201).json({
      error: false,
      message: "account created successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "server error" });
  }
});

//sign in
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "please enter your email and password to login ",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "you don't have an account please sign up first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "invalid creditinals" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600m",
      },
    );
    return res.status(200).json({
      error: false,
      message: "login successfully",
      email,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "server error" });
  }
});

//get user
app.get("/get-user", authenticationToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ error: true, message: "unauthorized" });
    }
    return res.json({
      user: {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
        createdOn: user.createdOn,
      },
      message: "",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "server error" });
  }
});

//add note
app.post("/add-note",authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const userID = req.user.userId;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: true, message: "title and content are required" });
  }

  try {
    const note = new Note({ title, content, tags: tags || [], userID });
    note.save();

    return res.json({ erro: false, message: "nore added successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "server error" });
  }
});

// edit note 
app.put("/edit-note/:noteId",authenticationToken,async (req,res)=>{
    const {title,content,tags,isPinned} = req.body;
    const noteId = req.params.noteId; 
    const userId = req.user.userId;
    try {
        const note = await Note.findOne({_id : noteId , userId})
        if (!note){return res.status(404).json({error:true,message:"note not found"})};
        if (title) note.title = title;
        if (content) note.content = content; 
        if (tags) note.tags = tage ; 
        if (typeof isPinned === "boolean") note.isPinned = isPinned;
        await note.save();
        return res.json({error:false,message:"note updated successfully"});
    } catch (error) {
        return res.status(500).json({ error: true, message: "server error" });
    }
})
