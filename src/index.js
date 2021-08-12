const app = require("./app");
const { config } = require('dotenv');
config();

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started at port ", process.env.PORT || 5000);
});
