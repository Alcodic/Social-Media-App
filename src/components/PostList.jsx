import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

//Here we are not using props instead using useContext
const PostListContext = () => {
  const { postListValue, addInitialPostsValue } = useContext(PostListData);

  const handleGetPostsClick = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPostsValue(data.posts);
      });
  };

  return (
    <>
      {postListValue.length === 0 && (
        <WelcomeMessage onGetPostsClick={handleGetPostsClick} />
      )}
      {postListValue.map((post) => (
        <Post key={post.id} postProp={post} />
      ))}
    </>
  );
};
export default PostListContext;
