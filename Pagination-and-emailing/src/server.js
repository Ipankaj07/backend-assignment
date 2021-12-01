const app = require("./index");
const connect = require("./config/db");

app.listen(3040, async () => {
  await connect();
  console.log("Server is listening on port 3040");
});
