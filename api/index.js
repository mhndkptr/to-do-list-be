const app = require("../src/app");
require("dotenv").config();

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
