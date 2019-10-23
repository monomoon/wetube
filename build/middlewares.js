"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = exports.uploadAvatar = exports.uploadVideo = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 미들웨어로 파일의 URL을 반환
var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "monomoon-wetube/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "monomoon-wetube/avatar"
  })
}); // const multerVideo = multer({ dest: "uploads/videos/" }); local pc test
//const multerAvatar = multer({ dest: "uploads/avatars/"});

var uploadVideo = multerVideo.single("videoFile"); // "" 는 html에서의 name

exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "WeTube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
}; //.locals 는 글로벌 변수를 만들어 준다. 
//routes파일의 routes 오브젝트를 전역으로 사용 가능하게 만들어 준다. 여기에서 전역변수로 사용도는 것들은 pug에서만 작동된다?? 전역번수가 되었다고 router/userRouter에서 import routes from "./routes"를 삭제하면 에러가 발생한다. 
//미들웨어로 중간에서 처리하고 next()로 넘겨줌S


exports.onlyPrivate = onlyPrivate;