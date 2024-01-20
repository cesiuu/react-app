import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './../../style/App.css';
import './../../style/albums.css';


interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [displayAllPhotosAlbumId, setDisplayAllPhotosAlbumId] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchAlbums();
    fetchPhotos();
  }, []);

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbum((prevAlbum) => (prevAlbum === albumId ? null : albumId));
    setDisplayAllPhotosAlbumId(null);
  };

  const handleDisplayAllClick = (albumId: number) => {
    setDisplayAllPhotosAlbumId((prevAlbumId) => (prevAlbumId === albumId ? null : albumId));
  };

  const handleThumbnailClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      <h1>Albums</h1>
      <ul className='album-list'>
        {albums.map((album) => {
          const firstPhoto = photos.find((photo) => photo.albumId === album.id);
          const matchingPhotos = photos.filter((photo) => photo.albumId === album.id);

          return (
            <li key={album.id}>
              <p>{album.title}</p>
              <button onClick={() => handleDisplayAllClick(album.id)}>Display All Photos</button>
              <ul className='thumbnail-list'>
                {(selectedAlbum === album.id || displayAllPhotosAlbumId === album.id) &&
                  matchingPhotos.map((photo) => (
                    <li key={photo.id} onClick={() => handleThumbnailClick(photo)}>
                      <img src={photo.thumbnailUrl} alt={photo.title} />
                    </li>
                  ))}
                {!displayAllPhotosAlbumId && selectedAlbum !== album.id && firstPhoto && (
                  <li key={firstPhoto.id} onClick={() => handleThumbnailClick(firstPhoto)}>
                    <img src={firstPhoto.thumbnailUrl} alt={firstPhoto.title} />
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>

      {selectedPhoto && (
        <div className='modal-overlay' onClick={handleCloseModal}>
          <div className='modal-content'>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
    </div>
  );
};

function Albums() {
  useEffect(() => {
    document.title = "Albums"
 }, []);
  return (
    <div className="App">
      <header className='App-Header'>
        <AlbumList />
      </header>
    </div>
  );
}

export default Albums;