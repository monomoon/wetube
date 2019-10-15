import multer from "multer"; // 미들웨어로 파일의 URL을 반환
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/"});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
}; 

export const onlyPublic = (req, res, next) => {
  if(req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
}

export const onlyPrivate = (req, res, next) => {
  if(req.user){
    next();
  } else {
    res.redirect(routes.home);
  }
}

export const uploadVideo = multerVideo.single("videoFile"); // "" 는 html에서의 name
export const uploadAvatar = multerAvatar.single("avatar");
//.locals 는 글로벌 변수를 만들어 준다. 
//routes파일의 routes 오브젝트를 전역으로 사용 가능하게 만들어 준다. 여기에서 전역변수로 사용도는 것들은 pug에서만 작동된다?? 전역번수가 되었다고 router/userRouter에서 import routes from "./routes"를 삭제하면 에러가 발생한다. 
//미들웨어로 중간에서 처리하고 next()로 넘겨줌S