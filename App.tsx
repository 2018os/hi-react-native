import { Alert } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import Loading from "./Loading";

const API_KEY = "d172bb83f8e98bfb107a16a9714e54c8";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWeahter = async (latitude: number, longitude: number) => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      console.log(data);
    };
    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        getWeahter(latitude, longitude);
        setIsLoading(false);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    };
    getLocation();
  }, [isLoading]);

  return isLoading ? <Loading /> : null;
};

export default App;
