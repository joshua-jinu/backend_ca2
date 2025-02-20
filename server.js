import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

const users = [
  { username: "alice", age: 25, email: "alice@example.com" },
  { username: "bob", age: 30, email: "bob@example.com" },
  { username: "charlie", age: 28, email: "charlie@example.com" },
];

app.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email || email.length == 0) {
      return res
        .status(400)
        .json({ message: "User parameter cannot be empty", success: false });
    }

    const data = users.find((user) => user.email === email);
    if (!data) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).send({ message: "User found", data, success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});
app.get("/", async (req, res) => {
  try {
    return res.status(200).send({ message: "user fouund", success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
