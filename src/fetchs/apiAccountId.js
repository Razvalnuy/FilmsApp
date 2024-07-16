import { urlOptins } from "../utils/utils";

export const apiAccountId = async (token) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { basisURL, account } = urlOptins;
    const response = await fetch(`${basisURL}/${account}`, options);

    if (response.ok) {
      const data = await response.json();
      console.log(`Верно!`);
      return data;
    } else {
      console.log(`token`, token);
      throw new Error("Ошибка запроса userId");
    }
  } catch (err) {
    console.log("errFetch", err);
  }
};
