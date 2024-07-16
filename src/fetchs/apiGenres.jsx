export const fetchGenres = async (token) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=ru",
      options
    );
    const data = await response.json();


    return data;
  } catch (err) {
    console.log("errFetch", err);
  }
};
