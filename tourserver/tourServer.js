var app = require('./app');

host = "127.0.0.11";
port = "1711";
app.listen(port, host, function () {
    console.log('Server is running at https://127.0.0.11:1711');
});
