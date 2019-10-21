export const getEmail = (email) => {
  const account = email.toLowerCase().trim();
  const URL = `https://api.github.com/users/${account}`;
  return fetch(URL)
          .then((res) => res.json());
};