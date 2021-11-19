import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const DayInfo = ({ name, value, icon, color }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          margin: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name={icon} size={30} color={color} />
          <Text style={{ marginStart: 10, fontSize: 20, color: "white" }}>
            {name}
          </Text>
        </View>

        <Text style={{ fontSize: 20, color: "white" }}>{value}</Text>
      </View>
      <View
        style={{
          marginStart: 16,
          marginEnd: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: "white",
        }}
      />
    </View>
  );
};

export default DayInfo;

const styles = StyleSheet.create({});
