import express from 'express'
import path from 'path'

const app = express();

app.use(express.static(path.resolve() + '/public'));

var port = process.env.PORT || 3000;

//Catch every url call and redirect to index.html
app.get(/^.*$/,
    function (req, res) {
        res.sendFile(path.resolve()+'/public/index.html');
    }
);

app.listen(port);
console.log("listening on port "+port);
