var app=require('http').createServer(handler),
	io=require('socket.io').listen(app),
	fs=require('fs');
var express = require("express");
var port = process.env.PORT || 5000;
app.listen(port);
io.set('log level',1);
function handler(req,res){
	fs.readFile(__dirname+'/index.html',function(err,data){
		if(err){
			res.writeHead(500);
			return res.end('Error');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	})
}
io.sockets.on('connection',function(socket){
	
	socket.on('emit_from_iphone',function(data){
		io.sockets.emit('emit_from_pc',data);
		console.log(data);
	});
	
});