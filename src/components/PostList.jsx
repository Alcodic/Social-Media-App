import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

//Here we are not using props instead using useContext
const PostListContext = () => {
  const { postListValue, addInitialPostsValue } = useContext(PostListData);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    console.log("fetch started");
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPostsValue(data.posts);
        setFetching(false);
        console.log("fetch returned");
      });
    console.log("fetch ended");

    return () => {
      console.log("Cleaning up UseEffect");
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postListValue.length === 0 && <WelcomeMessage />}
      {!fetching &&
        postListValue.map((post) => <Post key={post.id} postProp={post} />)}
    </>
  );
};
export default PostListContext;
