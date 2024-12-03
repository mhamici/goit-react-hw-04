import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';



const API_KEY = 'CqDhAJNmy_kUDnwJ8cfkrRwSNdq4N1wjUu37p9KjJ2E';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(BASE_URL, {
          params: { query, page, client_id: API_KEY },
        });
        setImages((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (image) => setModalImage(image);

  const handleCloseModal = () => setModalImage(null);

  return (
  <div className="app">
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal isOpen={!!modalImage} image={modalImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
