import { createContext, useReducer } from "react";

export const PostList = createContext({
  postListValue: [],
  addPostValue: () => {},
  addInitialPostsValue: () => {},
  deletePostValue: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postIdPayLoad
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.postsPayload;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, body, reactions, tags) => {
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

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        postsPayload: posts,
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
        addInitialPostsValue: addInitialPosts,
        deletePostValue: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
