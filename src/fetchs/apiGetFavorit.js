import { urlOptins } from "../utils/utils";

export const apiGetFavorit = (token, accountId) => {
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
      const data = await fetch(
        `${basisURL}/${account}/${accountId}/${favorite}/${movies}?${ru}-RU&page=1&sort_by=created_at.asc`,
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
