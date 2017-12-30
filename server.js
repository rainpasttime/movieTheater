'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname+'/'));
app.use(bodyParser.urlencoded({ extended: true }));
let orm = require("orm");

orm.connect('sqlite:/home/rain/movieTheater/DB/movies.db', function(err, db) {
    if (err) return console.error('Connection error: ' + err);
    else console.log('success!');
});

app.use(orm.express('sqlite:/home/rain/movieTheater/DB/movies.db',{
    define: function (db, models, next) {
        models.movie = db.define("movie", {
            id: Number,
            alt:String,
            year:Number,
            title:String,
            rating:String,
            original_title:String,
            directors:String,
            casts:String,
            image:String
        });
        models.genre = db.define("genre", {
            id: Number,
            name:String
        });
        models.movie_genre = db.define("movie_genre", {
            id: Number,
            movie_id:Number,
            genre_id:Number
        });

        next();
    }
}));


app.post('/index', (req, res) => {
    let findOne = req.body.genres;
    let genreID;
    let movieGet = [];
    // movieGet.push("a");
    // console.log(findOne);
    req.models.genre.find({name:findOne},function (err,genre) {
        if(err) console.log("error...One");
        genreID = genre[0].id;
        // console.log(genre[0].id);
        req.models.movie_genre.find({genre_id:genreID},function (err,movieID) {
            if(err) console.log("error...Two");
            for(let i=0;i<movieID.length;i++){
                req.models.movie.find({id:movieID[i].movie_id},function (err,movieInfo) {
                    if(err)
                        console.log("error...Three");
                    let newGet={};
                    newGet.id = movieInfo[0].id;
                    newGet.alt = movieInfo[0].alt;
                    newGet.year = movieInfo[0].year;
                    newGet.title = movieInfo[0].title;
                    newGet.rating = movieInfo[0].rating;
                    newGet.original_title = movieInfo[0].original_title;
                    newGet.directors = movieInfo[0].directors;
                    newGet.casts = movieInfo[0].casts;
                    newGet.image = movieInfo[0].image;
                    movieGet.push(newGet);
                    // console.log(newGet);
                    // console.log(movieInfo[0].id);
                });
            }
        });
    });
    movieGet.push("what");
    console.log("movieGet")
    console.log(movieGet);
    res.send(movieGet);
    //res.sendFile('index.html', {root: './'});
});

app.listen(3000, () => {
    console.log('running on port 3000...');
});

