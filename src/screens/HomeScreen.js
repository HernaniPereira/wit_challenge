import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import useLocation from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";
import { Ionicons } from "@expo/vector-icons";
import CityItem from "../components/CityItem";
import { cities } from "../data";
import LottieView from "lottie-react-native";
import GooglePlacesInput from "../components/GooglePlacesInput";
import Constants from "expo-constants";

const HomeScreen = ({ navigation }) => {
  const { data } = useLocation();
  const weather = useWeather(data);
  const [locations, setLocation] = useState(cities);
  const [id, setId] = useState(
    Math.max.apply(
      Math,
      cities.map(function (o) {
        return o.id;
      })
    )
  );

  if (weather.loading) {
    return (
      <LottieView
        source={require("../assets/weather_clouds.json")}
        autoPlay
        loop
      />
    );
  }
  const currentWeather = weather.data.weather[0];
  const UserInfo = () => {
    {
      /* USER LOCATION */
    }
    return (
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() =>
          navigation.navigate("Detail", {
            info: { name: weather.data.name, coords: data.coords },
          })
        }
      >
        <View
          style={{
            margin: 16,
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 10,
          }}
        >
          <View>
            <View
              style={{ flexDirection: "row", marginStart: 16, marginTop: 10 }}
            >
              <Ionicons name="md-location-sharp" size={24} color="black" />
              <Text style={{ alignItems: "center" }}> {weather.data.name}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                {Math.round(weather.data.main.temp)}ºC
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-end",
                marginEnd: 16,
                justifyContent: "center",
              }}
            >
              <Text>{currentWeather.description}</Text>
              <Text>
                {Math.round(weather.data.main.temp_min)}º/
                {Math.round(weather.data.main.temp_max)}ºC
              </Text>
              <Text>
                Feels Like {Math.round(weather.data.main.feels_like)}º
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      {/* SEARCH BAR */}
      <View style={styles.searchBarContainer}>
        <GooglePlacesInput
          onLocationPress={(data, details = null) => {
            const coordinates = details.geometry.location;

            setLocation([
              ...locations,
              {
                id: id + 1,
                name: details.address_components[0].long_name,
                coords: {
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                },
              },
            ]);
            setId(id + 1);
          }}
        />
      </View>
      {/* OTHER LOCATIONS */}
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={UserInfo}
          data={locations}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { info: item })}
              >
                <CityItem data={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    zIndex: 1,
  },
});
