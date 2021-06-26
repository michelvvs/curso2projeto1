import './styles.css';

export const PostCard = (props) => {
    const post = props.post;
    return(
        <div className ="post">
            <div key={post.id} className="post-content">
                <img src={post.cover} alt={post.title}></img>
                <h1 >{post.title} ({post.id})</h1>
                <p>{post.body}</p>
                <div className="comments">
                    <p><strong>comentários</strong></p>
                    {post.comments.map(comment => (<p>nome: {comment.name}</p>))}       
                </div>
            </div> 
        </div> 
    );
    
}
