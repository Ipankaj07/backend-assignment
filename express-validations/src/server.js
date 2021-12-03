const app = require("./index");
const connect = require("./config/db")

app.listen(4000, async () => {
    await connect();
  console.log("Server is listening on port 4000");
});
