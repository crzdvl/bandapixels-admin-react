function getKey(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setKey(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const tagService = {
  getKey,
  setKey,
};
