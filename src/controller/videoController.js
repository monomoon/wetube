import Video from "../models/Videos";
import routes from "../routes";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({_id: -1});
        res.render("home", { pageTitle:'Home', videos});
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle:'Home', videos: [] });
    }
};

//search

export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    let videos =[];
    try{
        videos= await Video.find({
            title: {$regex: searchingBy, $options: "i"}
        });
    } catch(error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

//upload

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async (req, res) => {
    const {
      body: { title, description },
      file: { location }
    } = req;
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  }; 

//detail

export const videoDetail = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const video = await Video.findById(id)
        .populate("creator")
        .populate("comments");
      res.render("videoDetails", { pageTitle: video.title, video });
    } catch (error) {
      res.redirect(routes.home);
    }
  };

//edit video

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    }=req;
    try{
        const video = await Video.findById(id);
        if(video.creator != req.user.id){ 
            throw Error(); 
        } else {
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video });
        } 
    }catch(error){ 
        res.redirect(routes.home);
        
    }
};

export const postEditVideo = async (req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
      await Video.findOneAndUpdate({ _id: id }, { title, description });
      res.redirect(routes.videoDetail(id));
    } catch (error) {
      res.redirect(routes.home);
    }
  };

//delete video

  export const deleteVideo = async(req, res) => {
    const {
        params:{ id }
    }=req;
    try{
        await Video.findOneAndRemove({_id: id})
    }catch{}
    
    res.redirect(routes.home)
};

export const postRegisterView = async(req, res) => {
    const {
        params :{ id }
    }=req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch(error) {
        res.status(400);
    } finally{
        res.end();
    }
};

export const postAddComment = async(req, res) =>{
    const {
        params: { id },
        body:{ comment },
        user
    } = req;
    try{
        const video = Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creater: user.id
        });
        video.comments.push(newComment.id);
        video.save();
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
};
//pug를 사용하게된다면 send 에서 render로 바꿈 render("home")은 views 폴더에서 home.pug파일을 자동으로 찾아서 화면에 렌더링하게된다.j
// render 함수의 첫번째 인자 render( 1: 뷰템플릿, 2?: 템플릿에 추가할 객체object (정보), 3?: 콜백함수) 