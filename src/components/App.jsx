import React, {Component} from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import {getImagesByQueryAndPage} from "../services/fetchImages";
import Notification from "./Notification";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: '',
    total: 0
  };

  whetherToFetchImages = (prevState) => {
    const {query, page, total, images} = this.state;
    return query.toLowerCase() !== prevState.query.toLowerCase()
      || (page !== prevState.page && images.length <= total);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.whetherToFetchImages(prevState)) {
      await this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    if(this.state.query.toLowerCase() === query.toLowerCase()) return;
    this.setState({query, page: 1, images: []});
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  fetchImages = async () => {
    try {
      const {query, page} = this.state;
      const {hits, totalHits} = await getImagesByQueryAndPage(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits
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
    const {images, isLoading, showModal, selectedImage, total} = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery images={images} onClick={this.openModal}/>
        {isLoading && <Loader/>}
        {!isLoading && !images.length && <Notification/>}
        { !isLoading && !!images.length && images.length < total &&(
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

