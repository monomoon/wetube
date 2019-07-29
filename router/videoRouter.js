import express from "express";
import { upload, 
         videoDetail, 
         editVideo, 
         deleteVideo, 
         videos } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get(videos, videos);
videoRouter.get(upload, upload);
videoRouter.get(videoDetail, videoDetail);
videoRouter.get(editVideo, editVideo);
videoRouter.get(deleteVideo, deleteVideo);

export default videoRouter;