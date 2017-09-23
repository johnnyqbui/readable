const baseApi = 'http://localhost:3001';

export const getPosts = () =>
  fetch(`${baseApi}/posts`, { headers: { 'Authorization': 'jb' }})
    .then(res => res.json())

export const getCats = () =>
  fetch(`${baseApi}/categories`, { headers: { 'Authorization': 'jb' }})
    .then(res => res.json())
