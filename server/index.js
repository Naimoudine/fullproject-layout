require("dotenv").config();

require("./database/client").checkConnection();

const app = require("./app/config");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`server is listening on ${PORT}, http://localhost:${PORT}`);
});
