import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../store/post-list-store";

const Post = ({ postProp }) => {
  const { deletePostValue } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {postProp.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePostValue(postProp.id)}
          >
            {<MdDeleteForever />}
          </span>
        </h5>
        <p className="card-text">{postProp.body}</p>
        {postProp.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {postProp.reactions} people.
        </div>
      </div>
    </div>
  );
};
export default Post;
