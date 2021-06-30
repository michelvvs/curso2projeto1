import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { PostCard } from '../../components/PostCard';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import { loadPosts } from '../../utils/load-posts';

export const Home = () => {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 5,
  //   searchValue: ''
  // };

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const leftPosts = allPosts.length - posts.length;
  const loadMoreDisabled = leftPosts <= 0;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await loadPosts();
    //console.log('LOAD POSTS page: ', page, 'posts per page:', postsPerPage)
    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  }, []);

  useEffect(() => {
    console.log('oi');
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const newPage = page + postsPerPage;
    const newPageItens = allPosts.slice(newPage, postsPerPage + newPage);
    posts.push(...newPageItens);
    //console.log('LOAD MORE page: ', page, 'posts per page:', postsPerPage, newPage);
    //console.log('pegar dp: ', newPage, 'ao:', (postsPerPage + newPage));
    setPosts(posts);
    setPage(newPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {(!!searchValue && <h2>Buscando por {searchValue}</h2>) || <h2>Faça uma busca</h2>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      <div className="posts">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            cover={post.cover}
            body={post.body}
            comments={post.comments}
          />
        ))}
      </div>
      <div className="buttonContainer">
        {!searchValue && <Button text={leftPosts} event={loadMorePosts} disabled={loadMoreDisabled} />}
      </div>
    </section>
  );
};
// export class Home2 extends Component {
//   // state = {
//   //     posts: [],
//   //     allPosts: [],
//   //     page: 0,
//   //     postsPerPage: 5,
//   //     searchValue: ""

//   //   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postAndPhotos = await loadPosts();
//     this.setState({
//       posts: postAndPhotos.slice(page, postsPerPage),
//       allPosts: postAndPhotos
//     });
//     //console.log('LOAD POSTS page: ', page, 'posts per page:', postsPerPage)

//   }

//   loadMorePosts = () => {
//     const {posts, page, postsPerPage, allPosts } = this.state;
//     const newPage = page + postsPerPage;
//     const newPageItens = allPosts.slice(newPage, (postsPerPage + newPage ));
//     posts.push(...newPageItens);
//     this.setState({
//       posts ,
//       page: newPage
//     });
//     //console.log('LOAD MORE page: ', page, 'posts per page:', postsPerPage, newPage);
//     //console.log('pegar dp: ', newPage, 'ao:', (postsPerPage + newPage));

//   }

//   handleChange = (e) => {
//     const {value} = e.target;
//     this.setState({searchValue: value});
//   }

//   render () {
//     const { posts, page, allPosts, postsPerPage, searchValue } = this.state;
//     const leftPosts = allPosts.length - posts.length;
//     const loadMoreDisabled = (leftPosts <= 0)
//     const filteredPosts = !!searchValue ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(searchValue.toLowerCase());
//       })
//     : posts;
//     }
// }
