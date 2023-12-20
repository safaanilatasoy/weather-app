import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CityContext = createContext();

// eslint-disable-next-line react/prop-types
export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
    const apiURL = "https://turkiyeapi.cyclic.app/api/v1/provinces?fields=name";
  useEffect(() => {
    async function fetching() {
      await axios(apiURL)
        .then((res) => res.data)
        .then((res) => res["data"])
        .then((res) => {
          setCities(res);
        });
    }

    fetching();
  }, []);

  return (
    <CityContext.Provider value={cities}> {children} </CityContext.Provider>
  );
};

export default CityContext;
