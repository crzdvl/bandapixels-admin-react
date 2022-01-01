export const getFetchedPosts = (
  { posts: { allPosts: { data } } },
) => data;

export const getCountOfPosts = (
  { posts: { allPosts: { count } } },
) => count;

export const getLastCreatedPost = (
  { posts: { createdPost } },
) => createdPost;

export const getPost = (
  { posts: { post } },
) => post;

export const getPublishedPost = (
  { posts: { publishedPost } },
) => publishedPost;
