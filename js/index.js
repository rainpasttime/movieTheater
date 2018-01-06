$(window).on('load', function () {
    $('.ma5slider').ma5slider();
});

function displayMovie(data){
    if (data.length>0) {
        let add = "";
        let tem;
        let length = 31<data.length?31:data.length;
        for(let i =1;i-1<length;i++){
            if(i%3===1)
                add+="<div class=\"row wrapper\">";
            tem="";
            tem = "<div class=\"col-md-4 stage clearfix\">" +
                "<div class=\"scene\">" +
                "<div class=\"movie\" onclick=\"return true\">" +
                "<div class=\"poster\">" +
                "<img src=\"" +
                data[i-1].image.toString()+
                "\" style=\"width: 260px;height: 400px\" alt=\""+data[i-1].title.toString()+"\">"+
                "</div>" +
                "<div class=\"info\">" +
                "<header>" +
                "<h1>name:  " +
                data[i-1].title.toString()+
                "</h1>"+
                "<span class=\"infoDetail\"> alias:  " +
                data[i-1].original_title.toString()+
                "</span><br/>"+
                "<span class=\"infoDetail\"> year:  " +
                data[i-1].year.toString()+
                "</span><br/>"+
                "<span class=\"infoDetail\">scores:  " +
                data[i-1].rating.toString()+
                "</span><br/>"+
                "<span class=\"infoDetail\">director:  " +
                data[i-1].directors.toString()+
                "</span><br/>"+
                "<span class=\"infoDetail\"> actor:  " +
                data[i-1].casts.toString()+
                "</span><br/>"+
                "<span class=\"infoDetail\"> area:  " +
                data[i-1].area.toString()+
                "</span>"+
                "</header>\n" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            if(i%3===0)
                tem+="</div>";
            add+=tem;
        }
        $("#typeAdd").html(add);
    }
    else if(data.length===0){
        alert("NULL");
    }
    else{
        alert("what");
    }
}

function TypeClick(search,tag){
    let searchType = {};
    if(tag===1)
        searchType.genres = search;
    else
        searchType.area = search;
    $.ajax({
        type: "post",
        url: "http://localhost:3000/index",
        dataType: "json",
        data: searchType,
        success: function (data) {
            displayMovie(data);
        }
    });
}

$(document).ready(function(){
    $("#juqing").click(function(){
        TypeClick("剧情",1);
    });
    $("#aiqing").click(function(){
        TypeClick("爱情",1);
    });
    $("#xiju").click(function(){
        TypeClick("喜剧",1);
    });
    $("#kehuan").click(function(){
        TypeClick("科幻",1);
    });
    $("#donghua").click(function(){
        TypeClick("动画",1);
    });
    $("#dongzuo").click(function(){
        TypeClick("动作",1);
    });
    $("#xuanyi").click(function(){
        TypeClick("悬疑",1);
    });

    $("#China").click(function(){
        TypeClick("大陆",0);
    });
    $("#HongKong").click(function(){
        TypeClick("香港",0);
    });
    $("#America").click(function(){
        TypeClick("美国",0);
    });
    $("#Taiwan").click(function(){
        TypeClick("台湾",0);
    });
    $("#Janpan").click(function(){
        TypeClick("日本",0);
    });
    $("#Korea").click(function(){
        TypeClick("韩国",0);
    });
    $("#England").click(function(){
        TypeClick("英国",0);
    });
    $("#France").click(function(){
        TypeClick("法国",0);
    });
    $("#another").click(function(){
        TypeClick("其他",0);
    });
    $("#searchButton").click(function(){
        let searchContention = $("#searchContention").val();
        $.ajax({
            type: "post",
            url: "http://localhost:3000/search",
            dataType: "json",
            data: {data:searchContention},
            success: function (data) {
                displayMovie(data);
            }
        })
    });
});