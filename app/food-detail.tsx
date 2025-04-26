import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import {
  useFonts,
  Manjari_400Regular,
  Manjari_700Bold,
} from "@expo-google-fonts/manjari";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FoodDetailScreen() {
  const params = useLocalSearchParams();
  const geminiOutput = params.geminiOutput as string;
  const title = params.title as string;

  const [showBenefits, setShowBenefits] = useState(true);
  const [showRisks, setShowRisks] = useState(true);

  const [fontsLoaded] = useFonts({
    Manjari_400Regular,
    Manjari_700Bold,
  });

  const pros = geminiOutput?.match(/\*\*Pros(?: of .*?)?\*\*([\s\S]*?)\*\*Cons(?: of .*?)?\*\*/)?.[1]
  ?.trim()
  ?.split(/\n(?=\d+\.\s)/) || [];

const cons = geminiOutput?.match(/\*\*Cons(?: of .*?)?\*\*([\s\S]*)/)?.[1]
  ?.trim()
  ?.split(/\n(?=\d+\.\s)/) || [];


  if (!fontsLoaded) return null;

  const toggleSection = (section: "benefits" | "risks") => {
    LayoutAnimation.easeInEaseOut();
    section === "benefits" ? setShowBenefits(!showBenefits) : setShowRisks(!showRisks);
  };

  const extractHeaderBody = (line: string) => {
    const match = line.match(/\d+\.\s*\*\*(.*?)\*\*:\s*(.*)/);
    if (match) {
      return { header: match[1].trim(), body: match[2].trim() };
    } else {
      return { header: "Info", body: line.replace(/^\d+\.\s*/, "") };
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Image
          source={require("../assets/images/food-icon.png")} // Replace with your food icon
          style={styles.foodImage}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>{title || "Food Item"}</Text>
          <View style={styles.ratingRow}>
            <AntDesign name="heart" size={20} color="#EA6B6B" />
            <Text style={styles.ratingText}> Looks good!</Text>
          </View>
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={20} color="#F3BE4D" />
            <Text style={styles.ratingText}> 4.7/5</Text>
          </View>
        </View>
        <Ionicons name="bookmark-outline" size={24} color="#E6C882" />
      </View>

      {/* Benefits Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection("benefits")}
        >
          <Ionicons name="thumbs-up-outline" size={22} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Benefits</Text>
          <Feather
            name={showBenefits ? "chevron-up" : "chevron-down"}
            size={22}
            color="#A67B5B"
          />
        </TouchableOpacity>

        {showBenefits &&
          pros.map((item, index) => {
            const { header, body } = extractHeaderBody(item);
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.cardHeader}>{header}</Text>
                <Text style={styles.cardText}>{body}</Text>
              </View>
            );
          })}
      </View>

      {/* Risks Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection("risks")}
        >
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={22}
            color="#f44336"
          />
          <Text style={styles.sectionTitle}>Possible Risks</Text>
          <Feather
            name={showRisks ? "chevron-up" : "chevron-down"}
            size={22}
            color="#A67B5B"
          />
        </TouchableOpacity>

        {showRisks &&
          cons.map((item, index) => {
            const { header, body } = extractHeaderBody(item);
            return (
              <View key={index} style={styles.cardRisk}>
                <Text style={styles.cardHeader}>{header}</Text>
                <Text style={styles.cardText}>{body}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3E7DE",
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: "row",
    backgroundColor: "#F3E7DE",
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "Manjari_700Bold",
    marginBottom: 4,
    color: "#4C3B28",
    flexWrap: "wrap",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Manjari_400Regular",
    color: "#4C3B28",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#FAE8DC",
    padding: 10,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Manjari_700Bold",
    color: "#4C3B28",
    marginLeft: 8,
    flex: 1,
  },
  card: {
    backgroundColor: "#EFE3D9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardRisk: {
    backgroundColor: "#FCE7E7",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardHeader: {
    fontFamily: "Manjari_700Bold",
    fontSize: 15,
    marginBottom: 4,
    color: "#4C3B28",
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Manjari_400Regular",
    color: "black",
  },
});
