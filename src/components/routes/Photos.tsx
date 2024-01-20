import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './../../style/App.css';
import './../../style/photos.css';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      <h1>Photo List</h1>
      <ul className="photo-list">
        {photos.map((photo) => (
          <li key={photo.id} onClick={() => handlePhotoClick(photo)}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
      {selectedPhoto && (
        <div className="photo-modal" onClick={closeModal}>
          <img src={selectedPhoto.url} alt={selectedPhoto.title} />
        </div>
      )}
    </div>
  );
};

function Photos() {
  useEffect(() => {
    document.title = "Photos"
 }, []);
  return (
    <div className="App">
      <header className="App-header">
        <PhotoList />
      </header>
    </div>
  );
}

export default Photos;
