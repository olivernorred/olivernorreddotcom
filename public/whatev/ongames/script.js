$(document).ready(function(){
//Slider
var orlando = $("#orlando")
var slider = $("#slider")
  slider.mouseenter(function(){
  slider.css({"font-size": "15pt"});
});
slider.mouseleave(function() {
slider.css({"font-size": "10pt"});
});
//Tabs
$("#games").hide();
$("#about").hide();
$("#downloads").hide();
$("#orlandoarticle").hide();

$("#hometab").mousedown(function(){
//This: Show
$("#home").fadeIn("medium");
//Everything Else: Hide
$("#games").hide();
$("#about").hide();
$("#downloads").hide();
$("#orlandoarticle").hide();
});
$("#gamestab").mousedown(function(){
//This: Show
$("#games").fadeIn("medium");
//Everything Else: Hide
$("#home").hide();
$("#about").hide();
$("#downloads").hide();
$("#orlandoarticle").hide();
});
$("#abouttab").mousedown(function(){
//This: Show
$("#about").fadeIn("medium");
//Everything Else: Hide
$("#home").hide();
$("#games").hide();
$("#downloads").hide();
$("#orlandoarticle").hide();
});
$("#downloadtab").mousedown(function(){
//This: Show
$("#downloads").fadeIn("medium");
//Everything Else: Hide
$("#home").hide();
$("#games").hide();
$("#about").hide();
$("#orlandoarticle").hide();
});
$("#orlandotab").mousedown(function(){
//This: Show
$("#orlandoarticle").fadeIn("medium");
//Everything Else: Hide
$("#home").hide();
$("#games").hide();
$("#about").hide();
$("#downloads").hide();
});
$(document).mousedown(function(){
document.getElementById("click").play();
});
//back to top
var top = $(".top");
top.click(function(){
window.scrollTo(0,0);
});
//box movement
var box = $("#box")
var box_clicked = false;
box.click(function(){
box_clicked = true;
});
//tabs fade in
var tabs = $("#tabs");
tabs.mouseenter(function(){
tabs.animate({
opacity: 1
}, 200);
$(this).clearQueue();
});
tabs.mouseleave(function(){
tabs.animate({
opacity: 0.25
}, 200);
$(this).clearQueue();
});
//title
var Qtitle = $("#title");
var Jtitle = document.getElementById("title");
//tab size
var tab = $(".tab");
// tab.mouseenter(function(){
// $(this).animate({
// "height": "45px"
// }, 200);
// $(this).clearQueue();
// });
// tab.mouseleave(function(){
// $(this).animate({
// "height": "35px"
// }, 200);
// $(this).clearQueue();
// });
});