import './App.css';
import { Component, useDebugValue } from 'react';

class App extends Component {
  state = {
      posts: []

    };

  timeoutUpdate = null;
  
  componentDidMount() {
      this.loadPosts();
  }


    loadPosts = async () => {
      const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
      const commentsResponse = fetch('https://jsonplaceholder.typicode.com/comments');
      const [posts, photos, comments] = await Promise.all([postsResponse, photosResponse, commentsResponse]);
      const postsJson = await posts.json();
      const photosJson = await photos.json();
      const commentsJson = await comments.json();
      const postAndPhotos = postsJson.map((post, index) => {
        const commentsOfpost = commentsJson.filter(comment => ( comment.postId === index));
        return { ...post, cover: photosJson[index].url, 
          comments: commentsOfpost
        }
      });
      this.setState({ posts: postAndPhotos})

    }


  handleTimeOut = () => {
    const { posts } = this.state;
    posts[0].title = 'novo titulo'
    


  }

  render () {
    const { posts } = this.state;
    return (
      <section className="container">
          <div className="posts"> 
          
          {posts.map(post => (
            <div className ="post">
              <div key={post.id} className="post-content">
                <img src={post.cover} alt={post.title}></img>
                <h1 >{post.title} </h1>
                <p>{post.body}</p>
                <div className="comments">
                  <p><strong>comentários</strong></p>
                    {post.comments.map(comment => (
                      <p>nome: {comment.name}</p>
                    ))}
                  
                </div>
              </div>
            </div> 
          )) }
        </div>
      </section>
      
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
