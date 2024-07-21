const express = require('express');
const routes = require('./_routes');
const cors = require('cors');

const app = express();
// Set up middleware
app.use(express.json());

app.use(cors())

// Set up routes
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});