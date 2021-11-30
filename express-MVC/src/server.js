const app = require(".");
const connect = require("./config/db");

app.listen(2000, async () => {
  await connect();
  console.log("server running on port 2000");
});
