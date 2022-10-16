export async function searchFreeImages(param) {
  const convertParam = new URLSearchParams(param).toString();

  const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY}&${convertParam}`;
  const response = fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  return response;
}
