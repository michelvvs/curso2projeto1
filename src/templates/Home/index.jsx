import { Component } from 'react';

import './styles.css';


import { PostCard } from '../../components/PostCard';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import { loadPosts } from '../../utils/load-posts';


export class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 5,
      searchValue: ""

    };

  
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({ 
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos
    });
    //console.log('LOAD POSTS page: ', page, 'posts per page:', postsPerPage)

  }

  loadMorePosts = () => {
    const {posts, page, postsPerPage, allPosts } = this.state;
    const newPage = page + postsPerPage;
    const newPageItens = allPosts.slice(newPage, (postsPerPage + newPage ));
    posts.push(...newPageItens);
    this.setState({
      posts ,
      page: newPage 
    });
    //console.log('LOAD MORE page: ', page, 'posts per page:', postsPerPage, newPage);
    //console.log('pegar dp: ', newPage, 'ao:', (postsPerPage + newPage));

  }

  handleTimeOut = () => {
    const { posts } = this.state;
    posts[0].title = 'novo titulo'
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render () {
    const { posts, page, allPosts, postsPerPage, searchValue } = this.state;
    console.log('page: ', page);
    const leftPosts = allPosts.length - posts.length; 
    const loadMoreDisabled = (leftPosts <= 0)
    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    
    : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
          <h2>Buscando por {searchValue}</h2>
          ) || 
          <h2>Faça uma busca</h2>}
          

            <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
          
          
          <div className="posts"> 
          
          {filteredPosts.map(post => (
            <PostCard id={post.id} post={post} />
          )) }
        </div>
        <div className="buttonContainer">
          {!searchValue  && (
          
            <Button
            text={leftPosts}
            event={this.loadMorePosts}
            disabled = {loadMoreDisabled} />
          )}
        </div>
      </section>
      
    )
  }
}
