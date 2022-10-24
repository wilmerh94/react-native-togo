import { createContext, useEffect, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";
export const LocationContext = createContext();
export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("San francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);

        setLocation(result);
      })
      .catch((e) => {
        setIsLoading(false);

        setError(e);
      });
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
