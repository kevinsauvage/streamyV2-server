import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    url: `mongodb+srv://kevinSauvage:${process.env.MONGO_CLUSTER_PASSWORD}@cluster0.of2ah.mongodb.net/test?retryWrites=true&w=majority`,
  },
};

export default config;
