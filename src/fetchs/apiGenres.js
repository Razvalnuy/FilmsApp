import { urlOptins } from "../utils/utils";

export const fetchGenres = async (token) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { genre, movie, ru, basisURL, list } = urlOptins;
    const response = await fetch(
      `${basisURL}/${genre}/${movie}/${list}?${ru}`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Вы не авторизавоны!!! *чтобы получить жанры");
    }
  } catch (err) {
    console.log("errFetch", err);
  }
};
