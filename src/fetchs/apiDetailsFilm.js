export const apiDetailsFilm = (
  token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2M1ZDI3Y2UzMGNhYjJiYWEwYTBiN2MxMGM2NDc2YSIsInN1YiI6IjY2M2JmNjQ3MWEzZDAyYTE0MDc4MDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2grBVV_YHSHRbl1ouPqOvXu5w3-HV5FjJ2Y5HMbXy0s",
  id
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  try {
    const getSortFilms = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=ru`,
        options
      );
      const detailsFilm = await data.json();
      return detailsFilm;
    };
    return getSortFilms();
  } catch (err) {
    console.log(`errFetchFilmsSort`, err);
  }
};
