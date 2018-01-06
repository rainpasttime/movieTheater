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
let typeID = ["juqing","aiqing","xiju","kehuan","donghua","dongzuo","xuanyi"];
let typeSearch = ["剧情","爱情","喜剧","科幻","动画","动作","悬疑"];
let areaID =["China","HongKong","America","Taiwan","Janpan","Korea","England","France","another"];
let areaSearch = ["大陆","香港","美国","台湾","日本","英国","法国","其他"];

$(document).ready(function(){

    for(let t=0;t<typeID.length;t++){
        let search = "#"+typeID[t];
        $(search).click(function(){
           TypeClick(typeSearch[t],1);
        });
    }


    for(let t=0;t<areaID.length;t++){
        let search = "#"+areaID[t];
        $(search).click(function(){
            TypeClick(areaSearch[t],0);
        });
    }

    // //负责显示匹配名字
    // $("#searchContention").keydown(function() {
    //     let searchContention = $("#searchContention").val();
    //     $.ajax({
    //         type: "post",
    //         url: "http://localhost:3000/search",
    //         dataType: "json",
    //         data: {data:searchContention},
    //         success: function (data) {
    //             let names =[];
    //             for(let j=0;j<data.length;j++){
    //                 names.push(data[j].title);
    //             }
    //             let tem;
    //             tem = "<select multiple class=\"form-control\">";
    //             for(let j=0;j<data.length;j++){
    //                 tem+="<option>"+names[j]+"</option>";
    //             }
    //             tem+="</<select>"
    //             $("#formChange").html(tem);
    //         }
    //     });
    // });

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