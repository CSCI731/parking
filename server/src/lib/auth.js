export const isLogged = (user) => {
  return !!(user && user._id);
};

export const isAdmin = (user) => {
  return isLogged(user) && user.roles.includes('admin');
};


export default {
  isLogged,
  isAdmin,
}