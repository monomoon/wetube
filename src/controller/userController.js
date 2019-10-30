import passport from "passport";
import routes from "../routes";
import User from "../models/User";

//join
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async(req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("error","Passwords don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try{
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    }catch(error){
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

//login

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash:"welcome",
  failureFlash:"Can't login. Check email or password"
});

export const githubLogin= passport.authenticate('github');
export const githubLoginCallback = async(_, __, profile, cb) => {
  const { _json: {id, avatar_url:avatarUrl, name, email} }=profile;
  try{
    const user = await User.findOne({ email });
    if(user){
      user.githubId = id;
      user.save();
      return cb(null, user);
    } 
    const newUser = await User.create({
      email,
      name,
      avatarUrl,
      githubId: id
    });
     return cb(null, newUser);
  }catch(error){
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

//logout

export const logout = (req, res) => {
  req.flash('info','Logged Out');
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", {pageTitle: "User Detail", user: req.user})
}
export const userDetail = async(req, res) => {
  const {
    params :{ id }
  }=req;
  try{
    const user = await User.findById(id);
    res.render("userDetail", {pageTitle: "User Detail", user});
  }catch(error){
    req.flash("error","User not found");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit Profile"});
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {

    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    req.flash("success","Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => res.render("changePassword", {pageTitle: "Change Password"});
export const postChangePassword = async(req, res) => {
  const{
      body:{currentPassword,
      newPassword,
      newPassword2}
    }=req;
    try{
      if(newPassword !== newPassword2){
        req.flash("error","Passwords don't match");
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
        return;
      }
      await req.user.changePassword(currentPassword, newPassword);
      res.redirect(routes.me);
    }catch(error){
      req.flash("error","Passwords can't change");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
    }
  }
