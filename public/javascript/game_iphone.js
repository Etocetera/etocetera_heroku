//通信
socket.on('emit_disconnect', function() {
    alert('接続が切れました');
    location.reload();
});

socket.on('disconnect', function() {
    emit.socket('disconnect_iphone', room_name);
});

var toucharea = $_id("toucharea");
var flag=2;
 /* タッチしたときのイベント */
toucharea.addEventListener("touchend", touchHandler, false);
function touchHandler(event) {
    if(flag>=2){
        socket.emit('touch',room_name);  
    }else{
        flag+=1;
    }
}   

// 二本でタッチした時のイベント
toucharea.addEventListener("gesturestart", gesturestartHandler, false);
function gesturestartHandler(event) {
    $("span").toggleClass("option");
    flag=0;
}

//ゲーム機能
//音量の変化
var up_volume = document.getElementById('up_volume');
var down_volume = document.getElementById('down_volume');
up_volume.addEventListener('touchend', function() {
    socket.emit("up_vol_emit",room_name);
}, false);
down_volume.addEventListener('touchend', function() {
    socket.emit("down_vol_emit", room_name);
}, false);

//回転の検出
window.onorientationchange = function() {
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
var img_width=64;
var img_height=64;
var canvas, ctx;
var canvasSizeX, canvasSizeY;
var mouseImg, rabbitImg;

canvas = $_id("canvas_animation");
ctx = canvas.getContext("2d");
canvasSizeX = canvas_animation.width;
canvasSizeY = canvas_animation.height;
mouseImg = $_id("mouseImg");
rabbitImg = $_id("rabbitImg")
mouseImg.onload = function() {
    ctx.drawImage(mouseImg, 0, img_height*2,img_width,img_height,0,0,canvasSizeX,canvasSizeY);
}

//キャラの変更
function character_change(touch_image_id,change_image){
    var chara_name=$_id(touch_image_id);
    chara_name.addEventListener('touchend',function() {
        ctx.clearRect(0,0,canvasSizeX,canvasSizeY);
        ctx.drawImage(change_image, 0, img_height*2,img_width,img_height,0,0,canvasSizeX,canvasSizeY);
        socket.json.emit('chara_change',{
            room:room_name,
            name:touch_image_id
        });
    },false);
}

//ねずみ
character_change("mouse",mouseImg);

//うさぎ
character_change("rabbit",rabbitImg);
