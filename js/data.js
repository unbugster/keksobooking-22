const SERVER_SEND_URL = 'https://22.javascript.pages.academy/keksobooking';
const SERVER_GET_URL = 'https://22.javascript.pages.academy/keksobooking/data'

const createAd = (data) => {
  return fetch(SERVER_SEND_URL,
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => response.ok);
}


const getAdsData = () => {
  return fetch(SERVER_GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
}

export { SERVER_SEND_URL, createAd, getAdsData }
