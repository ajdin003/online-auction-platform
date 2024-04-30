const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('Online Auction Platform Server');
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});