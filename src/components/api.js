export const getPeople = (url) => {
  return fetch(url)
    .then(response => {
      return response.json();
    });
};