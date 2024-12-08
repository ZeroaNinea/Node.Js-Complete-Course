import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(process.env.PORT!, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
