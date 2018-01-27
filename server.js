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
            comments:String,
            comment_id:Number
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
            req.models.movie_area.find({area_id:areaID},function (err,movieID) {
                if(err) console.log("error...Two");
                for(let i = 0;i<movieID.length;i++){
                    movieSet.push(movieID[i].movie_id);
                }
                req.models.movie.find({id:movieSet},function (err,movieInfo) {
                    if (err) console.log("error...Three");
                    res.send(movieInfo);
                });
            });
        });
    }
});


app.post('/search', (req, res) => {
    let searchName = req.body.data;
    console.log("searchName");
    console.log(searchName);
    req.models.movie.find({title:orm.like("%"+searchName+"%")},function (err,movies) {
        if(err) console.log("error...One");
        else {
            console.log(movies);
            res.send(movies);
        }
    });
});

app.post('/pageTwo', (req, res) => {
    let searchID = req.body.data;
    //查询当前页面的电影的详情
    req.models.movie.find({id:searchID},function (err,movies) {
        if(err) console.log("error...One");
        else {
            //查询跟当前页面电影的类型编号
            req.models.movie_genre.find({movie_id:searchID},function (err,genreID) {
                if(err) console.log(err);
                let genreSet = [];
                for(let i = 0;i<genreID.length;i++)
                    genreSet.push(genreID[i].genre_id);
                // console.log(genreSet);
                //在movie_genre中找到与当前电影相同类型的电影的id
                req.models.movie_genre.find({genre_id:genreSet},function(err,movieID){
                    if(err) console.log(err);
                    let movieSet = [];
                    for(let i = 0;i<movieID.length;i++)
                        movieSet.push(movieID[i].movie_id);
                    //根据上一层的电影ID找到电影的详情
                    req.models.movie.find({id:movieSet},function(err,likeMovie){
                        if(err) console.log(err);
                        console.log("likeMovie");
                        for(let i=0;i<likeMovie.length;i++){
                            console.log(likeMovie[i].title);
                        }
                        //在评论页面找到当前页面电影的评论
                        req.models.comment.find({id:searchID},function(err,comments){
                            let arrayOfC = [];
                            for(let i=0;i<comments.length;i++){
                                arrayOfC.push(comments[i].comments);
                            }
                            console.log(arrayOfC);
                            res.send({details:movies[0],like:likeMovie,comments:arrayOfC});
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
        if(err) console.log(err);
        console.log("comments");
        console.log(comments);
        res.send(comments);
    });
});

app.get('/allMovie', (req, res) => {
    
    req.models.movie.all(function (err,movies) {
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

