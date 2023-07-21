import React, {useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import {getImagesByQueryAndPage} from "../services/fetchImages";
import Notification from "./Notification";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const {hits, totalHits} = await getImagesByQueryAndPage(query, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    if (query.toLowerCase() === newQuery.toLowerCase()) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };



  const openModal = imageURL => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery images={images} onClick={openModal}/>
      {isLoading && <Loader/>}
      {!isLoading && !images.length && <Notification/>}
      {!isLoading && !!images.length && images.length < total && (
        <Button onLoadMore={handleLoadMore}/>
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={selectedImage} alt=""/>
        </Modal>
      )}
    </div>
  );
}

export default App;

