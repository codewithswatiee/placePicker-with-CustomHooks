import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../httpFunc.js'
import { useFetch } from '../hooks/useFetch.js';


async function fetchSortedPlaces(){
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.longitude,
        position.coords.latitude,
      ); 
      resolve(sortedPlaces);
    });
  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {isFetching, error, fetchedData: availablePlaces,
  }= useFetch(fetchSortedPlaces, []);

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
