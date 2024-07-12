import { useEffect, useState } from "react";


export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setData] = useState(initialValue);

    useEffect(() => {
        async function fetchPlaces(){
          setIsFetching(true);
        try{
          const data = await fetchFn();
          setData(data);
        } catch(error) {
          setError({
            message: error.message || "Failed to fetch data"
          })
        }
    
        setIsFetching(false)
        }
        fetchPlaces();
      }, [fetchFn]);

      return {
        isFetching,
        fetchedData,
        setData, 
        error
      }
}