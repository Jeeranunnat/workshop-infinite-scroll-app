import { useEffect, useState } from 'react';
import PhotoComponent from './components/PhotoComponent';
import './App.css';
const App = () => {
  const apiKey = `48hJ_hDONwjacZ6RR9F8tjZkUN63zprSLVG1__JhVRs`;
  const [photos, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    setIsLoading(true);
    // const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=1`;
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhoto((oldData) => {
        return [...oldData, ...data];
      });
    } catch (error) {
      console.log('error');
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });
    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <PhotoComponent key={index} {...data} />;
          })}
        </div>
      </section>
    </div>
  );
};
export default App;
