import "@babel/polyfill";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter  from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import globalRouter from "./router/globalRouter";
import apiRouter from "./router/apiRouter";
import flash from "express-flash";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// const handleHome = (req, res) => res.send('hi from home');
// const handleProfile = (req, res) => res.send("hi you are in Profile");
app.use(helmet());// 보안기능의 미들웨어
app.set("view engine","pug"); 
// view 엔진을 퍼그로 설정
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser()); // 쿠키를 전달 받아 사용자 인증과 같이 쿠키 검사에 쓰인다.
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
//form이나 json 통해서 사용자가 입력한 정보들 회원가입,사진,아이디... 등을 검토
app.use(morgan("dev")); // 로그에 로그인에 관련한 정보가 표시된다.
 // 미들웨어로 handleHome과 handleProfile로 이동할때 중간에 실행이 된다.
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({mongooseConnection: mongoose.connection})
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(localsMiddleware);

app.use(routes.api, apiRouter);
app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);
app.use(routes.users, userRouter); 
// get이 아니고 use를 사용하게 되면 userRouter 전체를 사용하게 된다.
// app.get("/", handleHome); 
// app.get("/profile",handleProfile);
// routes.users -> ~:4000/users/ 뒤에 :id/change-password, :id/edit-profile, :id/user-detail 같은 경로가 따라 오게 된다. 

export default app; 
// default로 export하면 import app from "./app"이 된다. router와 비교해보자
