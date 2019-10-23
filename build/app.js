"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _middlewares = require("./middlewares");

var _routes = _interopRequireDefault(require("./routes"));

var _userRouter = _interopRequireDefault(require("./router/userRouter"));

var _videoRouter = _interopRequireDefault(require("./router/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./router/globalRouter"));

var _apiRouter = _interopRequireDefault(require("./router/apiRouter"));

require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var CookieStore = (0, _connectMongo["default"])(_expressSession["default"]); // const handleHome = (req, res) => res.send('hi from home');
// const handleProfile = (req, res) => res.send("hi you are in Profile");

app.use((0, _helmet["default"])()); // 보안기능의 미들웨어

app.set("view engine", "pug"); // view 엔진을 퍼그로 설정

app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _cookieParser["default"])()); // 쿠키를 전달 받아 사용자 인증과 같이 쿠키 검사에 쓰인다.

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //form이나 json 통해서 사용자가 입력한 정보들 회원가입,사진,아이디... 등을 검토

app.use((0, _morgan["default"])("dev")); // 로그에 로그인에 관련한 정보가 표시된다.
// 미들웨어로 handleHome과 handleProfile로 이동할때 중간에 실행이 된다.

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware);
app.use(_routes["default"].api, _apiRouter["default"]);
app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]); // get이 아니고 use를 사용하게 되면 userRouter 전체를 사용하게 된다.
// app.get("/", handleHome); 
// app.get("/profile",handleProfile);
// routes.users -> ~:4000/users/ 뒤에 :id/change-password, :id/edit-profile, :id/user-detail 같은 경로가 따라 오게 된다. 

var _default = app; // default로 export하면 import app from "./app"이 된다. router와 비교해보자

exports["default"] = _default;