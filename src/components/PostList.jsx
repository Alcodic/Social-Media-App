import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";

//Here we are not using props instead using useContext
const PostListContext = () => {
  const { postListValue } = useContext(PostListData);
  console.log(postListValue);
  return (
    <>
      {postListValue.map((post) => (
        <Post key={post.id} postProp={post} />
      ))}
    </>
  );
};
export default PostListContext;
