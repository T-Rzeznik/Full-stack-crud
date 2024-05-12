// Importing necessary modules and libraries
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb+srv://RWadmin:admin12@cluster0.iwwoeb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Initializing Express app
const app = express();
const port = process.env.PORT || 3000;

// MongoDB collection name and database name
const roomsCollection = "rooms";
const dbName = "final_pt2";

// Creating a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Middleware to ensure MongoDB connection before handling requests
app.use((req, res, next) => {
  if (!client.isConnected) {
    connectToDB()
      .then(() => next())
      .catch((error) => next(error));
  } else {
    next();
  }
});

// Express middleware to parse JSON bodies
app.use(express.json());

// Routes

// GET all rooms
app.get("/rooms", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(roomsCollection);
    const rooms = await collection.find({}).toArray();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET room by ID
app.get("/rooms/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(roomsCollection);
    const room = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (room) {
      res.status(200).json(room);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new room
app.post("/rooms", async (req, res) => {
  try {
    const { roomName, roomID, type } = req.body;

    // Construct the room object to be inserted into the database
    const room = { roomName, roomID, type };

    // Insert the room object into the collection
    const db = client.db(dbName);
    const collection = db.collection(roomsCollection);
    const result = await collection.insertOne(room);

    // Respond with success message
    res.status(201).json({
      message: "Room successfully created",
      roomId: result.insertedId // Sending back the generated _id for reference if needed
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// PUT (update) a room by ID
app.put("/rooms/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(roomsCollection);
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Room successfully updated" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a room by ID
app.delete("/rooms/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(roomsCollection);
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Room successfully deleted" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
