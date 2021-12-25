const mongoose = require("mongoose");
const URL =
  "mongodb+srv://bhushan:PakistanAllah786@cluster0.y86tf.mongodb.net/test";

module.exports = {
  db: async () => {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
      });
      console.log("db connected");
    } catch (err) {
      console.log("error: ", err);
    }
  },
  close: () => {
    mongoose.connection.close();
    console.log("db is closed");
  },
};
