const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://karrim4real:7NTwDqkKvbdEliXY@cluster0.8tzc3.mongodb.net/devlab?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
