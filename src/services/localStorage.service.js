function getKey(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setKey(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function removeKey(key) {
  return localStorage.removeItem(key);
}

export const localStorageService = {
  getKey,
  setKey,
  removeKey,
};
