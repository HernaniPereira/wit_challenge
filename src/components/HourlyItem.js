import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const HourlyItem = ({ data }) => {
  const weather = data.weather[0];
  var dt = new Date(data.dt * 1000);
  var hours = dt.getHours();
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <Text>{hours}:00</Text>
          <Text>{Math.round(data.temp)}ºC</Text>
        </View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
          }}
        />
        <Text
          style={{
            fontSize: 10,
            color: "white",
            alignSelf: "center",
            alignContent: "center",
            marginBottom: 10,
          }}
        >
          {weather.description}
        </Text>
      </View>
      <View
        style={{
          borderEndColor: "#ffffff85",
          borderEndWidth: 1,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default HourlyItem;

const styles = StyleSheet.create({});
