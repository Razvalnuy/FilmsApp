import Cookies from "js-cookie";
import { urlOptins } from "../utils/utils";

export const apiGetFavorit = (token, currentPage) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const getFavorit = async () => {
      const { basisURL, account, favorite, movies, ru } = urlOptins;
      const accountId = JSON.parse(Cookies.get("accountId"));
      const data = await fetch(
        `${basisURL}/${account}/${accountId}/${favorite}/${movies}?${ru}-RU&page`,
        options
      );
      const listFavorit = await data.json();
      return listFavorit;
    };
    return getFavorit();
  } catch (err) {
    console.log(`errGetFavorit`, err);
  }
};
