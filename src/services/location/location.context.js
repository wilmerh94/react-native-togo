import { createContext, useEffect, useMemo, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";
export const LocationContext = createContext();
export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword = "Antwerp") => {
    console.log(searchKeyword);
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((results) => {
        setIsLoading(false);

        setLocation(results);
        console.log(results);
      })
      .catch((err) => {
        setIsLoading(false);

        setError(err);
      });
  };

  useEffect(() => {
    onSearch();
  }, []);

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
