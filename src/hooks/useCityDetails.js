import React, { useState, useEffect } from "react";
import openWeathermap from "../api/openWeathermap";

export default (data) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(null);
  const getWeather = async () => {
    if (data == null) {
      return;
    }
    try {
      const {
        coords: { latitude, longitude },
      } = data;
      const response = await openWeathermap.get(
        `onecall?lat=${latitude}&lon=${longitude}&exclude=daily,minutely&appid=a1faa92f116fc1410f961ff21bd979db&units=metric`
      );

      setResults(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [data]);
  return { data: results, loading, error };
};
