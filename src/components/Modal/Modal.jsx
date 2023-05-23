import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, ModalImage } from './Modal.styled';

export const Modal = ({ largeImageURL, onClose, searchQuery }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImage src={largeImageURL} alt={searchQuery} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.proptTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};




// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import {Overlay, ModalWindow, ModalImage} from './Modal.styled';

// export class Modal extends Component {

//   componentDidMount() {
//       window.addEventListener('keydown', this.handleKeydown);
//   }

//   componentWillUnmount() {
//       window.removeEventListener('keydown', this.handleKeydown)
//   }

//   handleKeydown = e => {
//       if (e.code === 'Escape') {
//           this.props.onClose();
//       }
//   }

//   handleBackdropClick = e => {
//       if (e.currentTarget === e.target) {
//           this.props.onClose();
//       }
//   }

//   render() {
//     const {largeImageURL, searchQuery} = this.props;
//       return (
//           <Overlay onClick={this.handleBackdropClick}>
//               <ModalWindow>
//                   <ModalImage src={largeImageURL} alt={searchQuery} />
//               </ModalWindow>
//           </Overlay>
//       )
//   }
// };

// Modal.proptTypes = {
//     largeImageURL: PropTypes.string.isRequired,
//     onClose: PropTypes.func.isRequired,
//     searchQuery: PropTypes.string.isRequired,
// };
