'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname+'/'));
app.use(bodyParser.urlencoded({ extended: true }));
let orm = require("orm");

orm.connect('sqlite:/home/rain/JQueryMovie/DB/movies.db', function(err, db) {
    if (err) return console.error('Connection error: ' + err);
    else console.log('success!');
});

app.use(orm.express('sqlite:/home/rain/JQueryMovie/DB/movies.db',{
    define: function (db, models, next) {
        models.movie = db.define("movie", {
            id: Number,
            year:Number,
            title:String,
            rating:String,
            original_title:String,
            directors:String,
            casts:String,
            image:String,
            area:String,
            play:String
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
        models.area = db.define("area", {
            id: Number,
            name:String
        });
        models.movie_area = db.define("movie_area", {
            id: Number,
            movie_id:Number,
            area_id:Number
        });
        models.comment = db.define("comment", {
            id: Number,
            comments:String
        });
        next();
    }
}));


app.post('/index', (req, res) => {
    if(req.body.hasOwnProperty("genres")){
        let findOne = req.body.genres;
        let genreID;
        let movieSet = [];
        req.models.genre.find({name:findOne},function(err,genre) {
            if(err) console.log("error...One");
            //获得的电影类型的id
            genreID = genre[0].id;
            req.models.movie_genre.find({genre_id:genreID},function (err,movieID) {
                if(err) console.log("error...Two");
                for(let i = 0;i<movieID.length;i++)
                    movieSet.push(movieID[i].movie_id);
                req.models.movie.find({id:movieSet},function (err,movieInfo) {
                    if (err) console.log("error...Three");
                    // console.log("movieInfo");
                    res.send(movieInfo);
                });
            });
        });
    }
    else{
        let findOne = req.body.area;
        let areaID;
        let movieSet = [];
        req.models.area.find({name:findOne},function (err,area) {
            if(err) console.log("error...One");
            //获得的电影类型的id
            areaID = area[0].id;
            // console.log("area[0].id");
            // console.log(area[0].id);
            req.models.movie_area.find({area_id:areaID},function (err,movieID) {
                if(err) console.log("error...Two");
                for(let i = 0;i<movieID.length;i++){
                    movieSet.push(movieID[i].movie_id);
                }
                req.models.movie.find({id:movieSet},function (err,movieInfo) {
                    if (err) console.log("error...Three");
                    // console.log("movieInfo");
                    // for(let j =0;j<movieInfo.length;j++){
                    //     console.log(movieInfo[j].title);
                    //     console.log(movieInfo[j].area);
                    // }
                    res.send(movieInfo);
                });
            });
        });
    }
});


app.post('/search', (req, res) => {
    let searchName = req.body.data;
    // console.log("searchName");
    // console.log(searchName);
    req.models.movie.find({title:orm.like("%"+searchName+"%")},function (err,movies) {
        if(err) console.log("error...One");
        else {
            // console.log("movies in search");
            // console.log(movies.length);
            // for (let i = 0; i < movies.length; i++) {
            //     console.log(movies[i].title);
            // }
            res.send(movies);
        }
    });
});

app.post('/pageTwo', (req, res) => {
    let searchID = req.body.data;
    // console.log("search pageTwo");
    // console.log(searchName);
    req.models.movie.find({id:searchID},function (err,movies) {
        if(err) console.log("error...One");
        else {
            req.models.movie_genre.find({movie_id:searchID},function (err,genreID) {
                let genreSet = [];
                for(let i = 0;i<genreID.length;i++)
                    genreSet.push(genreID[i].genre_id);
                req.models.movie_genre.find({genre_id:genreSet},function(err,movieID){
                    let movieSet = [];
                    for(let i = 0;i<movieID.length;i++)
                        movieSet.push(movieID[i].movie_id);
                    req.models.movie.find({id:movieSet},function(err,likeMovie){
                        // console.log("likeMovie");
                        // console.log(likeMovie[0].title);
                        req.models.comment.find({id:searchID},function(err,comments){
                            let arrayOfC = [];
                            for(let i=0;i<comments.length;i++){
                                arrayOfC.push(comments[i].comments);
                            }
                            res.send({details:movies,like:likeMovie,comments:arrayOfC});
                        });
                    });
                });
            });
        }
    });
});

app.post('/addComment', (req, res) => {
    console.log("add comment");
    console.log(req.body.data);
    console.log(req.body.id);
    
    let insertComment = {};
    insertComment.id = req.body.id;
    insertComment.comments = req.body.data;
    req.models.comment.create(insertComment,function (err,comments) {
        console.log("comments");
        console.log(comments);
        res.send(comments);
    });
});

app.get('/allMovie', (req, res) => {
    
    req.models.movie.all(function (err,movies) {
        // console.log("movies");
        // console.log(movies);
        // res.send(comments);
        console.log("in");
        for(let i=0;i<10;i++){
            console.log(movies[i].title);
        }
        res.send(movies);
    });
});

app.listen(3000, () => {
    console.log('running on port 3000...');
});

