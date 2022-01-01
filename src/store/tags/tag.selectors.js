export const getFetchedTags = (
  { tags: { allTags: { data } } },
) => data;

export const getCountOfTags = (
  { tags: { allTags: { count } } },
) => count;

export const getLastAddedTag = (
  { tags: { createdTag } },
) => createdTag;
