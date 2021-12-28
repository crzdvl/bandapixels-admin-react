export const getFetchedTags = (
  { tags: { tags: { data } } },
) => data;

export const getCountOfTags = (
  { tags: { tags: { count } } },
) => count;

export const getLastAddedTag = (
  { tags: { tag } },
) => tag;
