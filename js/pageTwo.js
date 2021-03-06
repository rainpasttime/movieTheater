$(document).ready(function() {
    let href = location.href;
    let index = href.indexOf("=");
    let id = href.substr(index + 1);
    id = decodeURI(id);
    $.ajax({
        type: "post",
        url: "http://localhost:3000/pageTwo",
        dataType: "json",
        data: {data:id},
        success: function (data) {
            let details = data.details;
            let image = "<img src=\""+details.image+"\""+" class=\"MovieP\" >"
            $("#BigPoster").html(image);
            $("#name").html("名字：  "+details.title);
            $("#director").html("导演：  "+details.directors);
            $("#actor").html("主演：  "+details.casts);
            $("#year").html("上映时间：  "+details.year.toString());
            $("#nation").html("国家：  "+details.area);
            $("#play").html(details.play);
            let like=data.like;
            let index=[];
            //index中存储的是下标，随机选择likeMovie中的任意四个下标
            for(let i=0;i<4;i++) {
                let tem = like.length;
                let one = Math.floor(Math.random() * tem + 1);
                while(index.indexOf(one)!==-1)
                    one = Math.floor(Math.random() * tem + 1);
                index[i] = one;
            }
            let likeAppend="";
            for(let i=0;i<4;i++){
                let tem=index[i];
                likeAppend+="<div class=\"col-md-3 recommend\">" +
                    "<a href=\"pageTwo.html?id="+
                    like[tem].id+
                    "\">"+
                    "<img src=\""+
                    like[tem].image +
                    "\" class=\"recommend\">" +
                    "</a>"+
                    "<br/>" +
                    "<p class=\"recommendDetails\">名字："+
                    like[tem].title +
                    "<br>" +
                    "导演：" +
                    like[tem].directors +
                    "<br>" +
                    "主演：" +
                    like[tem].casts +
                    "<br>" +
                    "上映时间：" +
                    like[tem].year +
                    "<br>" +
                    "评分：" +
                    like[tem].rating +
                    "<br" +
                    "国家：" +
                    like[tem].area +
                    "</p>" +
                    "</div>"
            }
            $("#otherMovie").html(likeAppend);
            let comments = data.comments;
            let commentAppend = "";
            for(let i=0;i<comments.length;i++){
                let tem = "<p>"+comments[i]+"</p><hr/>";
                commentAppend+=tem;
            }
            $("#recommend").html(commentAppend);

        }
    });
});
$("#combnt").click(function(){
        let href = location.href;
        let index = href.indexOf("=");
        let id = href.substr(index + 1);
        id = decodeURI(id);
        let commentVal = $("#addComment").val();
        $.ajax({
        type: "post",
        url: "http://localhost:3000/addComment",
        dataType: "json",
        data: {data:commentVal,id:id},
        success: function (data) {
            let comments = data.comments;
            let add = "<p>"+comments+"</p><hr/>"
            $("#recommend").append(add);
            $("#addComment").val("");
        }
    });
});


