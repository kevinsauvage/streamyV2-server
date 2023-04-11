const publicUser = (user) => ({
  email: user.email,
  firstName: user.firstName,
  id: user._id,
  lastName: user.lastName,
  savedMovies: user.savedMovies,
});

export default publicUser;
