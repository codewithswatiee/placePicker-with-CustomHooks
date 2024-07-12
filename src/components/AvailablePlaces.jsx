import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../httpFunc.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

   useEffect(() => {

    async function fetchPlaces(){
      setIsFetching(true);
      try{
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.longitude,
            position.coords.latitude
          );
        setAvailablePlaces(sortedPlaces);
        setIsFetching(false)
      });
      } catch(error){
        setError({message: error.message || "couldn't fetch places, try Later!"});
        setIsFetching(false);
      }

    }

    fetchPlaces();
  }, []);

  if(error){
    return <Error title="An Error Occured" message={error.message }/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
