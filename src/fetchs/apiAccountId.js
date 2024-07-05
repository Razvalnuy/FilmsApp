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
    const { basisURL, account, accountId } = urlOptins;
    const response = await fetch(
      `${basisURL}/${account}/${accountId}`,
      options
    );

    if (response.ok) {
      const data = await response.json();
		console.log(`Верно!`)
      return data;
    }
  } catch (err) {
    console.log("errFetch", err);
  }
};
