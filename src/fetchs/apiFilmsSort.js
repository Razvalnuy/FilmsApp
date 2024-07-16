import { urlOptins } from "../utils/utils";

export const apiFilmsSort = async (token, sort, currentPage, accountId) => {

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const {
      movie,
      ru,
      top_rated,
      popular,
      basisURL,
      account,
      favorite,
      movies,
    } = urlOptins;
    let request = "";

    if (sort === 1)
      request += `${basisURL}/${movie}/${popular}?${ru}-RU&page=${currentPage}`;
    else if (sort === 2)
      request += `${basisURL}/${movie}/${top_rated}?${ru}-RU&page=${currentPage}`;
    else if (sort === 3)
      request += `${basisURL}/${account}/${accountId}/${favorite}/${movies}?${ru}-RU&page=${currentPage}`;

    const data = await fetch(request, options);

    if (data.ok) {
      const sortFilms = await data.json();
      return sortFilms;
    } else {
      console.log("Вы не авторизавоны!!! *чтобы получить фильмы");
    }
  } catch (err) {
    console.log(`errFetchFilmsSort`, err);
  }
};
