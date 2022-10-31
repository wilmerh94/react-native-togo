import { createContext, useEffect, useState } from 'react';
import { locationRequest, locationTransform } from './location.service';
export const LocationContext = createContext();
export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('San Francisco');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const locationFunction = async (locationKeyword) => {
    try {
      if (!locationKeyword.length) {
        // don't do anything
        return;
      }
      const locationService = await locationRequest(
        locationKeyword.toLowerCase()
      );
      const locationReady = locationTransform(locationService);
      setError(null);
      setIsLoading(false);
      setLocation(locationReady);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    locationFunction(keyword);
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, search: onSearch, keyword }}
    >
      {children}
    </LocationContext.Provider>
  );
};
//ADD PROVIDER TO THE APP
//TO USE IT IN ANY COMPONENT OR PAGE USE THIS:
// const { VARIABLES_YOU_NEED } = useContext(Context);
