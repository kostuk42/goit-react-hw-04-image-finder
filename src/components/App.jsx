import React, {Component} from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import {getImagesByQueryAndPage} from "../services/fetchImages";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      await this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({query, page: 1, images: []});
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }), async () => {
      await this.fetchImages();
    });
  };


  fetchImages = async () => {
    try {
      const {query, page} = this.state;
      const imagesData = await getImagesByQueryAndPage(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...imagesData],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  openModal = imageURL => {
    this.setState({selectedImage: imageURL, showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    const {images, isLoading, showModal, selectedImage} = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery images={images} onClick={this.openModal}/>
        {isLoading && <Loader/>}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore}/>
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImage} alt=""/>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

