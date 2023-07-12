import axios from "axios";

const apiKey = '22433952-2d63403013f80436a9dd1929b';

export const getImagesByQueryAndPage = async (query, page) => {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);
  return response.data
}
