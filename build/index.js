"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const express = require('express')
var app = (0, _express["default"])();
var PORT = 4000; //모듈의 express 모듈이 필요하다. 
// module > express > lib > router > index.js
// index.js 에는 다른 필요한 것들이 작성되어있다. 
// respond with "hello world" when a GET request is made to the homepage
//터미널에서 node index.js 를 눌러 서버를 실행 웹브라우저에서 localhost:4000 으로 연결이 된다.
// 터미널에서 ctrl C 를 누르게 되면 node가 종료된다.

var handleListening = function handleListening() {
  return console.log("Listening on: http://localhost:".concat(PORT));
};

var handleHome = function handleHome(req, res) {
  return res.send('hi from home');
};

var handleProfile = function handleProfile(req, res) {
  return res.send("hi you are in Profile");
};

var betweenHome = function betweenHome(req, res, next) {
  console.log("between");
  next(); // 중간 함수로 app.get("/",betweenHome,handleHome)과 같이 중간에 사용이 되며 next();를 넣어줘 다음 함수로 넘어가게 된다.
};

app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])()); // 보안기능의 미들웨어

app.use((0, _morgan["default"])("dev")); // 로그에 로그인에 관련한 정보가 표시된다.
// app.use(betweenHome); // 미들웨어로 handleHome과 handleProfile로 이동할때 중간에 실행이 된다.

app.get("/", handleHome); // 두개의 함수를 가진다. 

app.get("/profile", handleProfile);
app.listen(PORT, handleListening);