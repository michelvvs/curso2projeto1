export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
  const commentsResponse = fetch('https://jsonplaceholder.typicode.com/comments');
  const [posts, photos, comments] = await Promise.all([postsResponse, photosResponse, commentsResponse]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();
  const commentsJson = await comments.json();
  const postAndPhotos = postsJson.map((post, index) => {
    const commentsOfpost = commentsJson.filter((comment) => comment.postId === index);
    return { ...post, cover: photosJson[index].url, comments: commentsOfpost };
  });
  //
  return postAndPhotos;
};
