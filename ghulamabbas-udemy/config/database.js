import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true })
  .then((con) => {
    console.log(`MongoDB Database connected with host: ${con.connection.host}`);
  })
  .catch((err) => console.log(err));
};

export default connectDatabase;
