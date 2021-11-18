import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import useWeather from "../hooks/useWeather";

const CityItem = (data, { navigation }) => {
  const weather = useWeather(data.data);

  if (weather.loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  const currentWeather = weather.data.weather[0];

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "black",
        margin: 16,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#C0C0C0",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>{data.data.name}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`,
          }}
        />
        <Text>fog</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>
          {Math.round(weather.data.main.temp)}ºC
        </Text>
      </View>
    </View>
  );
};

export default CityItem;

const styles = StyleSheet.create({});
