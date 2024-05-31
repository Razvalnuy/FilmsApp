import { urlOptins } from "../utils/utils";

export const apiFilmsSort = (token, sort = 1, currentPage) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
	console.log(`tokenSv`, token)
    const { movie, ru, top_rated, popular, basisURL } = urlOptins;
    const getSortFilms = async () => {
      let request = `${basisURL}/${movie}/`;

      request +=
        sort === 1
          ? `${popular}?${ru}-RU&page=${currentPage}`
          : `${top_rated}?${ru}-RU&page=${currentPage}`;
      const data = await fetch(request, options);
      const sortFilms = await data.json();
      return sortFilms;
    };
    return getSortFilms();
  } catch (err) {
    console.log(`errFetchFilmsSort`, err);
  }
};
