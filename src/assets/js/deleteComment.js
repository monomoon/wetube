import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");
const delBtns = document.querySelectorAll(".delBtn");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (id, target) => {
  const span = target.parentElement;
  const li = span.parentElement;
  commentList.removeChild(li);
  decreaseNumber();
};

const handleClick = async event => {
  const target = event.target;
  const commentId = target.id;
  const response = await axios({
    url:`/api/${commentId}/delete-comment`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    deleteComment(commentId, target);
  }
};

const addEvent = () => {
  delBtns.forEach(ele => {
    ele.addEventListener("click",handleClick)
  });
};

function init() {
  addEvent();
}

if (delBtns) {
  init();
}