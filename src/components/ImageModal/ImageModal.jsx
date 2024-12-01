import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, image, onClose }) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>{image.description || 'No description'}</p>
      <button onClick={onClose} className={styles.closeButton}>Close</button>
    </Modal>
  );
}
