const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const app = require('./app');

//* Load env
dotenv.config();

//* Database connection
(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    //?error catch
    console.log(err);
    process.exit(1);
  }
})();


const port = +process.env.PORT || 3000;

const productionMode = process.env.NODE_ENV === 'production'
app.listen(port, () => {
  console.log(`Server running in ${productionMode?"production":"development"} mode on port ${port}`);
});
