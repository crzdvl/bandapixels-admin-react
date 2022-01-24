export const getFetchedPosts = (
  { posts: { posts } },
) => posts;

export const getCountOfPosts = (
  { posts: { count } },
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

export const getPostError = (
  { posts: { error } },
) => error;
