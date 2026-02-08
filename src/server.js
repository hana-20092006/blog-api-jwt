// start the server and listen for incoming requests on a specified port, allowing the application to handle client requests and send responses.

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});