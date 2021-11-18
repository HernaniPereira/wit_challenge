import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useCityData from "../hooks/useCityDetails";

const DetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const weather = useCityData(data);

  if (weather.loading) {
    return <Text>loading</Text>;
  }
  const currentWeather = weather.data.current.weather[0];
  console.log("aqui", currentWeather);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

        justifyContent: "flex-end",
        backgroundColor: "#808080",
      }}
    >
      {/* TOP */}
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          flex: 1,
        }}
      >
        {/* HEADER */}
        <View
          style={{
            margin: 16,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            backgroundColor: "red",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircle" size={24} color="#44353538" />
          </TouchableOpacity>
          <Text style={{ marginStart: 16, fontSize: 20, alignItems: "center" }}>
            {data.name}
          </Text>
        </View>
        <View>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`,
            }}
          />
        </View>
        <Text>ola</Text>
      </View>
      {/* BOTTOM */}
      <View
        style={{
          backgroundColor: "#fff",
          height: "70%",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          elevation: 2,
        }}
      >
        <Text>aqui</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
