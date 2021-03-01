import { Alert } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import Loading from "./Loading";
import Weather, { WeatherCondition } from "./Weather";

const API_KEY = "d172bb83f8e98bfb107a16a9714e54c8";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState<WeatherCondition>("Clear");

  useEffect(() => {
    const getWeahter = async (latitude: number, longitude: number) => {
      const {
        data: {
          main: { temp },
          weather,
        },
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setIsLoading(false);
      setTemp(temp);
      setCondition(weather[0].main);
    };
    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        getWeahter(latitude, longitude);
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
    };
    getLocation();
  }, [isLoading]);

  return isLoading ? (
    <Loading />
  ) : (
    <Weather temp={Math.round(temp)} condition={condition} />
  );
};

export default App;
