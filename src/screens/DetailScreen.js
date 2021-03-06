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
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useCityData from "../hooks/useCityDetails";
import HourlyItem from "../components/HourlyItem";
import Moment from "moment";
import DayInfo from "../components/DayInfo";
import LottieView from "lottie-react-native";

const DetailScreen = ({ route, navigation }) => {
  const { info } = route.params;
  console.log(info);
  const { data, loading, error } = useCityData(info);
  var date = new Date();
  const formated_date = Moment(date).format("D MMM YYYY");
  if (loading) {
    return (
      <LottieView
        source={require("../assets/weather_clouds.json")}
        autoPlay
        loop
      />
    );
  }

  const currentWeather = data.current.weather[0];

  const getHour = (unix_timestamp) => {
    var hour_min = new Date(unix_timestamp * 1000);
    var hour = hour_min.getHours();
    var min = "0" + hour_min.getMinutes();
    var formattedTime = hour + ":" + min.substr(-2);

    return formattedTime;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#808080",
      }}
    >
      {/* TOP */}
      <ImageBackground
        style={{ flex: 1, justifyContent: "flex-end" }}
        resizeMode="cover"
        source={require("../assets/day.jpg")}
      >
        <View style={styles.mainContainer}>
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="leftcircle" size={30} color="#ffffff85" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{info.name}</Text>
          </View>
          {/* BODY */}
          <View style={{ marginStart: 16, fontSize: 30, alignItems: "center" }}>
            <Text>{formated_date}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`,
                }}
              />
              <Text style={{ fontSize: 20 }}>11??C</Text>
            </View>

            <View
              style={{
                marginEnd: 16,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text>{currentWeather.description}</Text>
              <Text>Feels Like {Math.round(data.current.feels_like)}??C</Text>
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={data.hourly.slice(0, 24)}
              renderItem={({ item }) => {
                return <HourlyItem data={item} />;
              }}
            />
          </View>
        </View>
        {/* BOTTOM */}
        <View style={styles.bottom}>
          <DayInfo
            value={data.current.uvi}
            name={"UV index"}
            icon={"sun"}
            color={"yellow"}
          />
          <DayInfo
            value={getHour(data.current.sunrise)}
            name={"Sunrise"}
            icon={"sunrise"}
            color={"yellow"}
          />
          <DayInfo
            value={getHour(data.current.sunset)}
            name={"Sunset"}
            icon={"sunset"}
            color={"orange"}
          />
          <DayInfo
            value={Math.round(data.current.wind_speed) + " km/h"}
            name={"Wind"}
            icon={"wind"}
            color={"#47a5ff"}
          />

          <DayInfo
            value={data.current.humidity + "%"}
            name={"UV index"}
            icon={"droplet"}
            color={"#28b8f7"}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#fff",
    height: "50%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 2,
    backgroundColor: "#2f2f2fc2",
  },
  headerContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    marginStart: 16,
    fontSize: 20,
    alignItems: "center",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
  },
});
