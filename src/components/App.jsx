import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchPhoto } from '../API/fetchPhoto';
import { toast } from 'react-toastify';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(''); 
  const [photos, setPhotos] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [statusRend, setStatusRend] = useState('idle');

  const handleFormSubmit = inputValue => {
    setSearchQuery(inputValue);
    setPage(1);
    setPhotos([])
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const getModalImg = url => {
    setLargeImageURL(url);
    toggleModal();
  };

  useEffect(() => {
    if(!searchQuery) {
      return
    }
  
    fetchPhoto(searchQuery, page)
    .then(res => {
          setPhotos(photos=>[...photos, ...res.hits])
          setTotalHits(res.totalHits)
          setStatusRend('resolved')
          if (res.totalHits === 0) {
            toast.warn(`Not found`);
          } else {
            toast.success(`We found photos ${searchQuery}`);
          }
        })
        .catch(() => setStatusRend('rejected'));
  }, [page, searchQuery]);

  return (
    <>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        getModalImg={getModalImg}
        handleLoadMore={handleLoadMore}
        photos={photos}
        statusRend={statusRend}
        totalHits={totalHits}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={toggleModal}
          searchQuery={searchQuery}
        />
      )}
      <ToastContainer />
    </>
  );
};




// import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     showModal: false,
//     page: 1,
//     largeImageURL: '',
//   };

//   handleFormSubmit = inputValue => {
//     this.setState({ searchQuery: inputValue, page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({page: prevState.page + 1}));
//   };

//   toggleModal = () => {
//     this.setState(state => ({showModal: !state.showModal,
//     }));
//   };

//   getModalImg = url => {
//     this.setState({ largeImageURL: url });
//     this.toggleModal();
//   };

//   render() {
//     const { searchQuery, showModal, largeImageURL, page } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchQuery={searchQuery} onClick={this.getModalImg} handleLoadMore={this.handleLoadMore} page={page}/>
//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} searchQuery={searchQuery}/>
//         )}
//         <ToastContainer />
//       </>
//     );
//   }
// }
