$(document).ready(function() {
    let href = location.href;
    let index = href.indexOf("=");
    let searchContention = href.substr(index + 1);
    searchContention = decodeURI(searchContention);
    $.ajax({
        type: "post",
        url: "http://localhost:3000/pageTwo",
        dataType: "json",
        data: {data:searchContention},
        success: function (data) {
            let details = data.details[0];
            let image = "<img src=\""+details.image+"\""+" class=\"MovieP\" >"
            $("#BigPoster").html(image);
            $("#name").html("名字：  "+details.title);
            $("#director").html("导演：  "+details.directors);
            $("#actor").html("主演：  "+details.casts);
            $("#year").html("上映时间：  "+details.year.toString());
            $("#nation").html("国家：  "+details.area);
            let like=data.like;
            let length = 4<like.length?4:like.length;
            let index=[];
            for(let i=0;i<length;i++) {
                let tem = like.length-1+1;
                let one = Math.floor(Math.random() * tem + 1);
                while(index.indexOf(one)!==-1)
                    one = Math.floor(Math.random() * tem + 1);
                index[i] = one;
            }
            let likeAppend="";
            for(let i=0;i<length;i++){
                let tem=index[i];
                likeAppend+="<div class=\"col-md-3 recommend\">" +
                    "<a href=\"pageTwo.html?name="+
                    like[tem].title+
                    "\">"+
                    "<img src=\""+
                    like[tem].image +
                    "\" class=\"recommend\">" +
                    "</a>"+
                    "<br/>" +
                    "<p>名字："+
                    like[tem].title +
                    "</p>" +
                    "<p>导演：" +
                    like[tem].directors +
                    "</p>" +
                    "<p>主演：" +
                    like[tem].casts +
                    "</p>" +
                    "<p>上映时间：" +
                    like[tem].year +
                    "</p>" +
                    "<p>评分：" +
                    like[tem].rating +
                    "</p>" +
                    "<p>国家：" +
                    like[tem].area +
                    "</p>" +
                    "</div>"
            }
            $("#otherMovie").html(likeAppend);
        }
    });

    // $("#hoverDisplay").mouseenter(function(){
    //
    // })
});

