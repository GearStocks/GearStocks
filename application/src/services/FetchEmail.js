export const getEmail = async (email) => {
  const account = email.toLowerCase().trim();
  const URL = `https://api.github.com/users/${account}`;
  const res = await fetch(URL);
  return res.json();
};