$(window).on('load', function () {
    $('.ma5slider').ma5slider();
});

function displayMovie(data){
    if (data.length>0) {
        let add = "";
        let tem;
        for(let i =1;i-1<data.length;i++){
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
                "<a href=\"pageTwo.html?id="+
                data[i-1].id.toString()+
                "\">"+
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
                "</a>"+
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
let typeID = ["juqing","aiqing","xiju","kehuan","donghua","dongzuo","xuanyi"];
let typeSearch = ["剧情","爱情","喜剧","科幻","动画","动作","悬疑"];
let areaID =["China","HongKong","America","Taiwan","Janpan","Korea","England","France","another"];
let areaSearch = ["大陆","香港","美国","台湾","日本","韩国","英国","法国","其他"];

$(document).ready(function(){

    //侧边导航栏中的分类栏的点击事件
    for(let t=0;t<typeID.length;t++){
        let search = "#"+typeID[t];
        $(search).click(function(){
           TypeClick(typeSearch[t],1);
        });
    }

    //侧边导航栏中的地区栏的点击事件
    for(let t=0;t<areaID.length;t++){
        let search = "#"+areaID[t];
        $(search).click(function(){
            TypeClick(areaSearch[t],0);
        });
    }
});
//上搜索栏的搜索事件实现
$("#searchButton").click(function(){
    let searchContention = $("#searchContention").val();
    $.ajax({
        type: "post",
        url: "http://localhost:3000/search",
        dataType: "json",
        data: {data:searchContention},
        success: function (data) {
            if(data.length===0){
                alert("抱歉暂时没有这部电影");
            }
            displayMovie(data);
        }
    });
});
$('#searchContention').bind('keypress', function (event) { 
    if (event.keyCode == "13") {  
        $("#searchButton").click();      
    }
});

//轮播图的自动播放
let i=0;  
let c = null;  
    c = setTimeout(carousel,3000);//开始执行  
function carousel()  
{  
      
   clearTimeout(c);//清除定时器  
    
  $("#pic"+i).removeClass("active");  
  $("#pic"+(i+1)).addClass("active");  
  i++;  
  $("ol li").removeClass("active");  
  $("ol li:eq("+i+")").addClass("active");  
    
  if(i>2){  
    $("#pic"+(i-1)).removeClass("active");  
    $("#pic0").addClass("active");  
    i=0;  
    $("ol li:eq("+i+")").addClass("active");  
    
  }  
   c = setTimeout(carousel,3000); //设定定时器，循环执行               
}   
  