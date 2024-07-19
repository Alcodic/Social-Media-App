import { createContext, useReducer } from "react";

export const PostList = createContext({
  postListValue: [],
  addPostValue: () => {},
  deletePostValue: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postIdPayLoad
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, body, reactions, tags) => {
    console.log(`${userId} ${postTitle} ${body} ${reactions} ${tags}`);
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: body,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postIdPayLoad: postId,
      },
    });
    console.log(`delete post called for: ${postId}`);
  };

  return (
    <PostList.Provider
      value={{
        postListValue: postList,
        addPostValue: addPost,
        deletePostValue: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Bhutan",
    body: "hello friends, Is anyone interested in travelling to Bhutan along with me, just DM me",
    reactions: 2,
    userId: "user-90",
    tags: ["vacation", "Bhutan"],
  },
  {
    id: "2",
    title: "Got Placed ",
    body: "Finally got job offer from dream company",
    reactions: 28,
    userId: "user-9",
    tags: ["unbelieveable", "satisfaction"],
  },
];

export default PostListProvider;
