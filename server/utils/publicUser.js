const publicUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user._id,
    savedMovies: user.savedMovies,
  };
};

export default publicUser;
