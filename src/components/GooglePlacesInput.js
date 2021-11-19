import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const GooglePlacesInput = ({ onLocationPress }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={onLocationPress}
      fetchDetails={true}
      enablePoweredByContainer={false}
      styles={autoCompleteStyles}
      query={{
        key: "AIzaSyCyt0_3MpLFvdE8_Du-xt1eStVRtdM7wo4",
        language: "en",
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  listViewContainer: {
    position: "absolute",
    zIndex: 100,
    elevation: 3,
    top: 30,
    paddingHorizontal: 15,
  },
});
const autoCompleteStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    flex: 0,
  },
  listView: {
    borderColor: "#c8c7cc",
    borderWidth: 1,
    borderRadius: 30,
  },
});

export default GooglePlacesInput;
