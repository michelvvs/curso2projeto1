import P from 'prop-types';
import './styles.css';

export const PostCard = ({ title, cover, body, id, comments }) => {
  //const post = props.post;
  return (
    <div className="post">
      <div key={id} className="post-content">
        <img src={cover} alt={title}></img>
        <h1>
          {title} ({id})
        </h1>
        <p>{body}</p>
        <div className="comments">
          <p>
            <strong>comentários: </strong>
            {comments.length}{' '}
          </p>
          <p>eita</p>
          {/* {post.comments.map(comment => (<p>nome: {comment.name}</p>))}        */}
        </div>
      </div>
    </div>
  );
};

PostCard.defaultProps = {
  comments: [],
};

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
  comments: P.array,
};
