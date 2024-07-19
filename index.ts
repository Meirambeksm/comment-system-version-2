import { MainComment } from "./typescript/mainComment";
import { ResponseComment } from "./typescript/responseComment";
import { FilterComment } from "./typescript/filterComment";
import { PageComponents } from "./typescript/PageComponents";
import { Comments } from "./typescript/mainComment";
export const list: HTMLUListElement = document.querySelector(".comment")!;
export const comments: Comments[] = JSON.parse(
  localStorage.getItem("comments") ?? "[]"
);

export function renderPage(): void {
  list.innerHTML = "";

  comments.forEach((comment: Comments) => {
    const mainComment = new MainComment();
    // Render main comments
    mainComment.createListElement(
      list,
      comment.id,
      comment.avatar,
      comment?.username!,
      comment.date,
      comment.text,
      comment.likeBtn,
      comment.rating,
      mainComment.mainListType,
      comment?.username!
    );

    // Render responses
    comment?.responses?.forEach((response) => {
      const listAdd: HTMLUListElement | null = document.querySelector(
        `#comment-add-${response.parentId}`
      );

      if (listAdd) {
        mainComment.createListElement(
          listAdd,
          response.id,
          response.avatar,
          response?.username!,
          response.date,
          response.text,
          response.likeBtn,
          response.rating,
          mainComment.addListType,
          comment?.username!
        );
      }
    });
  });
}

renderPage();

const mainComment = new MainComment();
const responseComment = new ResponseComment();
const filterComment = new FilterComment();
const pageComponents = new PageComponents();

mainComment.mainCommentEvents();
responseComment.responseCommentEvents();
filterComment.filterCommentEvents();
pageComponents.pageComponentsEvents();
