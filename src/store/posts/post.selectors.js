export const getFetchedPosts = (
  { posts: { posts: { data } } },
) => data;

export const getCountOfPosts = (
  { posts: { posts: { count } } },
) => count;

export const getLastAddedPost = (
  { posts: { post } },
) => post;
