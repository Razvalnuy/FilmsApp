import Cookies from "js-cookie";
import { urlOptins } from "../utils/utils";

export const apiAddFavorite = (token, id, addOrDel) => {
  const { basisURL, account, favorite, movie } = urlOptins;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      media_type: movie,
      media_id: id,
      favorite: addOrDel,
    }),
  };

  try {
    const getSortFilms = async () => {
      const accountId = JSON.parse(Cookies.get("accountId"));
      const data = await fetch(
        `${basisURL}/${account}/${accountId}/${favorite}`,
        options
      );
      const detailsFilm = await data.json();
      return detailsFilm;
    };
    return getSortFilms();
  } catch (err) {
    console.log(`errFetchAddOrDelFavorite`, err);
  }
};
