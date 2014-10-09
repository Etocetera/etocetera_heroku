//通信
socket.on('emit_disconnect', function() {
    alert('接続が切れました');
    location.reload();
});

socket.on('disconnect', function() {
    emit.socket('disconnect_iphone', room_name);
});

var toucharea = $_id("toucharea");
var touchCount = 0;
// タッチしたときのイベント
toucharea.addEventListener("touchstart", touchHandler, false);
function touchHandler(event) {
    socket.emit('touch', room_name);
    touchCount++;
}   

// 二本でタッチした時のイベント
toucharea.addEventListener("gesturestart", gesturestartHandler, false);
function gesturestartHandler(event) {
    $("span").toggleClass("option");
}

//ゲーム機能
//音量の変化
var up_volume = document.getElementById('up_volume');
var down_volume = document.getElementById('down_volume');
up_volume.addEventListener('touchstart', function() {
    socket.emit("up_vol_emit", room_name);
}, false);
down_volume.addEventListener('touchstart', function() {
    socket.emit("down_vol_emit", room_name);
}, false);

//回転の検出
window.onorientationchange = function() {
    change_style();
    // 向きが変わった際に実行する処理を書く
    var direction = window.orientation;
    socket.json.emit('iphone_direction', {
        room: room_name,
        iphone_direction: direction
    });
}

function $_id(id) {
    return document.getElementById(id);
}

//キャラのアニメーション
var img_width = 64;
var img_height = 64;
var canvas, ctx;
var canvasSizeX, canvasSizeY;
var birdImg, monkeyImg, mouseImg, rabbitImg, sheepImg,
    tigreImg;

canvas = $_id("canvas_animation");
ctx = canvas.getContext("2d");
canvasSizeX = canvas_animation.width;
canvasSizeY = canvas_animation.height;
birdImg = $_id("birdImg");
cowImg = $_id("cowImg");
dogImg = $_id("dogImg");
//dragonImg = $_id("dragonImg");
//horseImg = $_id("horseImg");
monkeyImg = $_id("monkeyImg");
mouseImg = $_id("mouseImg");
rabbitImg = $_id("rabbitImg")
sheepImg = $_id("sheepImg")
snake = $_id("snakeImg");
tiger = $_id("tigerImg");
//wildBoar=$_id("wildBoarImg");
mouseImg.onload = function() {
    ctx.drawImage(mouseImg, 0, img_height*2, img_width, img_height,
                    0, 0, canvasSizeX, canvasSizeY);
}

var animationFrame = window.requestAnimationFrame ||
                     window.webkitRequestAnimationFrame;
                     
var i=1;
var j=0;
var frame_count=0;
function draw_animation() {
    animationFrame(draw_animation);
    frame_count++;
    if (touch_count % 2 == 0) {
        j=0;
    } else {
        j=1;
    }
    if(frame_count%10==0){
        ctx.clearRect(0,0,canvasSizeX,canvasSizeY);
        ctx.drawImage(img[character], img_width*(i-1), img_height*j,img_width,img_height,0,0,canvasSizeX,canvasSizeY);
        i++;
        if(i==9){
            i=1;
        }
    }
}

    //キャラの変更
function character_change(touch_image_id) {
    socket.json.emit('chara_change', {
        room:room_name,
        name:touch_image_id
    });
}

var bird = $_id("bird");
var cow = $_id("cow");
var dog = $_id("dog");
//var dragon = $_id("dragon");
//var horse = $_id("horse");
var monkey = $_id("monkey");
var mouse = $_id("mouse");
var rabbit = $_id("rabbit");
var sheep = $_id("sheep");
var snake = $_id("snake");
var tiger = $_id("tiger");
//var wildBoar=$_id("wildBoar");
bird.addEventListener('touchend',function(){
    character = "bird";
    character_change(character);
},false);
cow.addEventListener('touchend',function(){
    character = "cow";
    character_change(character);
},false);
dog.addEventListener('touchend',function(){
    character = "dog";
    character_change(character);
},false);
/*mouse.addEventListener('touchend',function(){
    character = "mouse";
    character_change(character);
},false);*/
/*mouse.addEventListener('touchend',function(){
    character = "mouse";
    character_change(character);
},false);*/
monkey.addEventListener('touchend',function(){
    character = "monkey";
    character_change(character);
},false);
mouse.addEventListener('touchend',function(){
    character = "mouse";
    character_change(character);
},false);
rabbit.addEventListener('touchend',function() {
    character = "rabbit";
    character_change(character);
},false);
sheep.addEventListener('touchend',function(){
    character = "sheep";
    character_change(character);
},false);
snake.addEventListener('touchend',function(){
    character = "snake";
    character_change(character);
},false);
tiger.addEventListener('touchend',function(){
    character = "tiger";
    character_change(character);
},false);
/*wildBoar.addEventListener('touchend',function(){
    character = "mouse";
    character_change(character);
},false);*/


change_style();
function change_style(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    $("#toucharea").css("width",width);
    $("#toucharea").css("height",height-20);
    $("#canvas_animation").css("left",width/2-100);
    $("#canvas_animation").css("top",height/2-100);
}
/*
//トリ
character_change("bird", birdImg);
//サル
character_change("monkey", monkeyImg);
//ねずみ
character_change("mouse", mouseImg);
//うさぎ
character_change("rabbit", rabbitImg);
//ヒツジ
character_change("sheep", sheepImg);
//トラ
character_change("tiger", tigerImg);*/
