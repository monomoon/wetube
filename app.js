import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter  from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import globalRouter from "./router/globalRouter";
import routes from "./routes";
const app = express()

// const handleHome = (req, res) => res.send('hi from home');
// const handleProfile = (req, res) => res.send("hi you are in Profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());// 보안기능의 미들웨어
app.use(morgan("dev")); // 로그에 로그인에 관련한 정보가 표시된다.
// app.use(betweenHome); // 미들웨어로 handleHome과 handleProfile로 이동할때 중간에 실행이 된다.

app.use("/", globalRouter);
app.use(routes.videos, videoRouter);
app.use(routes.users, userRouter); // get이 아니고 use를 사용하게 되면 userRouter 전체를 사용하게 된다.
// app.get("/", handleHome); 
// app.get("/profile",handleProfile);

export default app; 
// default로 exprot하면 import app from "./app"이 된다. router와 비교해보자