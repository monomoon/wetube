export const home = (req, res) => res.render("home");
export const search = (req, res) => res.render("search");
export const videos = (req, res) => res.render("videos");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetails");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");

//pug를 사용하게된다면 send 에서 render로 바꿈 render("home")은 views 폴더에서 home.pug파일을 자동으로 찾아서 화면에 렌더링하게된다.