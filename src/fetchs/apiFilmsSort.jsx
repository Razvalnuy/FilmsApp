export const apiFilmsSort = (token, sort = 1, currentPage) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };
  try {
    const getSortFilms = async () => {
      let request = "https://api.themoviedb.org/3/movie/";

      request +=
        sort === 1
          ? `popular?language=ru-RU&page=${currentPage}`
          : // todo Исправить баг, сделать сброс всегда на 1
            `top_rated?language=ru-RU&page=${currentPage}`;
      const data = await fetch(request, options);
      const sortFilms = await data.json();
      return sortFilms;
    };
    return getSortFilms();
  } catch (err) {
    console.log(`errFetchFilmsSort`, err);
  }
};
