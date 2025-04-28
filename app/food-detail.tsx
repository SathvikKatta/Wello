import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const router = useRouter();
  const params = useLocalSearchParams();
  const geminiOutput = params.geminiOutput as string;
  const titleParam = params.title as string;
  const [showBenefits, setShowBenefits] = useState(true);
  const [showRisks, setShowRisks] = useState(true);

  const [fontsLoaded] = useFonts({
    Manjari_400Regular,
    Manjari_700Bold,
  });

  const pros = geminiOutput?.match(/\*\*Pros(?: of.*?)?\*\*\s*([\s\S]*?)\s*\*\*Cons(?: of.*?)?\*\*/)?.[1]
    ?.trim()
    ?.split(/\n(?=\d+\.\s)/) || [];

  const cons = geminiOutput?.match(/\*\*Cons(?: of.*?)?\*\*\s*([\s\S]*)/)?.[1]
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
      return {
        header: match[1].trim().replace(/\*\*/g, ""),
        body: match[2].trim().replace(/\*\*/g, ""),
      };
    } else {
      return {
        header: "",
        body: line.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "").trim(),
      };
    }
  };

  return (
    <View style={styles.page}>
      {/* Top Rounded Bar */}
      <View style={styles.topRoundedBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#A67B5B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {titleParam || "Food Item"}
        </Text>
        <TouchableOpacity>
          <Ionicons name="scan-outline" size={24} color="#A67B5B" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Food Details */}
        <View style={styles.headerCard}>
          <Image
            source={require("../assets/images/food-icon.png")}
            style={styles.foodImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.foodTitle}>{titleParam || "Food Item"}</Text>
            <View style={styles.ratingRow}>
              <AntDesign name="heart" size={32} color="#EA6B6B" />
              <Text style={styles.ratingText}> Looks good!</Text>
            </View>
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={32} color="#F3BE4D" />
              <Text style={styles.ratingText}>4.7/5</Text>
            </View>
          </View>
          <Ionicons name="bookmark" size={40} color="#E6C882" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Benefits Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("benefits")}
          >
            <Ionicons name="thumbs-up-outline" size={40} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Benefits</Text>
            <Feather name={showBenefits ? "chevron-up" : "chevron-down"} size={40} color="#A67B5B" />
          </TouchableOpacity>

          {showBenefits && pros.map((item, index) => {
            const { header, body } = extractHeaderBody(item);
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.proConLabel}>Pro {index + 1}</Text>
                <Text style={styles.cardHeader}>{header}</Text>
                <Text style={styles.cardText}>{body}</Text>
              </View>
            );
          })}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Risks Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("risks")}
          >
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#f44336" />
            <Text style={styles.sectionTitle}>Possible Risks</Text>
            <Feather name={showRisks ? "chevron-up" : "chevron-down"} size={40} color="#A67B5B" />
          </TouchableOpacity>

          {showRisks && cons.map((item, index) => {
            const { header, body } = extractHeaderBody(item);
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.proConLabel}>Con {index + 1}</Text>
                <Text style={styles.cardHeader}>{header}</Text>
                <Text style={styles.cardText}>{body}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Add to Plate Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Plate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topRoundedBar: {
    backgroundColor: "#FAE8DC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Manjari_700Bold",
    color: "#A67B5B",
    marginHorizontal: 8,
  },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  foodImage: {
    width: 85,
    height: 85,
    borderRadius: 15,
    backgroundColor: "white",
    resizeMode: "contain",
  },
  foodTitle: {
    fontFamily: "Manjari_700Bold",
    fontSize: 23,
    color: "#4C3B28",
    flexWrap: "wrap",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: "Manjari_400Regular",
    color: "#4C3B28",
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0CFC2",
    marginVertical: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Manjari_700Bold",
    color: "#4C3B28",
    marginLeft: 8,
    flex: 1,
    marginTop: 9,
  },
  card: {
    backgroundColor: "#FAE8DC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  proConLabel: {
    fontFamily: "Manjari_700Bold",
    fontSize: 18,
    color: "black",
    marginBottom: 3,
  },
  cardHeader: {
    fontFamily: "Manjari_700Bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#4C3B28",
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Manjari_400Regular",
    color: "black",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#C8A97E",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Manjari_700Bold",
  },
});
