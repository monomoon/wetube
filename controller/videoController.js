import Video from "../models/Videos";
import routes from "../routes"


export const home = async (req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", { pageTitle:'Home', videos});
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle:'Home', videos});
    }
};
export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    // const searchingBy = req.query.term; 위와 동일
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}
export const getUpload = (req, res) => 
    res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
    const { body, file } =req;
    console.log(body, file);
    res.render("upload", {pageTitle: "Upload"});
    }
export const videoDetail = (req, res) => res.render("videoDetails", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});

//pug를 사용하게된다면 send 에서 render로 바꿈 render("home")은 views 폴더에서 home.pug파일을 자동으로 찾아서 화면에 렌더링하게된다.j
// render 함수의 첫번째 인자 render( 1: 뷰템플릿, 2?: 템플릿에 추가할 객체object (정보), 3?: 콜백함수) 