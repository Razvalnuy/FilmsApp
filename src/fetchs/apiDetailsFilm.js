import { urlOptins } from "../utils/utils";

export const apiDetailsFilm = (token, id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const getSortFilms = async () => {
      const { ru, movie, basisURL } = urlOptins;
      const data = await fetch(`${basisURL}/${movie}/${id}?${ru}`, options);
      const detailsFilm = await data.json();
      return detailsFilm;
    };
    return getSortFilms();
  } catch (err) {
    console.log(`errFetchFilmsSort`, err);
  }
};
