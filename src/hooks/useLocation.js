import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(null);
  const [mount, setMount] = useState(null);

  const getLocation = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access your location was denied.");
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getLocation();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return useMemo(
    () => ({ data: location, loading, error }),
    [location, error, loading]
  );
  //return { data: location, error, loading };
};
export default useLocation;
