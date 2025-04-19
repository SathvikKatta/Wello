import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  useFonts,
  Manjari_400Regular,
  Manjari_700Bold,
} from '@expo-google-fonts/manjari';
import { PublicSans_700Bold } from '@expo-google-fonts/public-sans';

const avatarImage = require('../assets/images/Intersect.png');
const foodImages = [
  require('../assets/images/image26.png'),
  require('../assets/images/image27.png'),
  require('../assets/images/image28.png'),
];

export default function TPlateScreen() {
  const [fontsLoaded] = useFonts({
    Manjari_400Regular,
    Manjari_700Bold,
    PublicSans_700Bold,
  });

  const [carbExpanded, setCarbExpanded] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header layout */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Image source={avatarImage} style={styles.avatar} />
            <Feather name="menu" size={30} color="#A87C5F" style={styles.menuIcon} />
          </View>

          <View style={styles.headerBottomRow}>
            <Ionicons name="arrow-back" size={45} color="#A87C5F" />
            <Text style={styles.headerTitle}>Today’s Plate</Text>
          </View>
        </View>

        {/* Calorie Summary */}
        <View style={styles.calorieBox}>
          <View style={styles.calorieLeft}>
            <Text style={styles.calorieNumber}>1030</Text>
            <Text style={styles.calorieLabel}>Calories</Text>
          </View>
          <View style={styles.calorieGoalBox}>
            <Text style={styles.calorieGoalLabel}>Until goal:</Text>
            <Text style={styles.calorieGoalValue}>800</Text>
          </View>
        </View>
        <View style={styles.calorieBarBackground}>
          <View style={[styles.calorieBarFill, { width: '56%' }]} />
        </View>

        {/* Carbohydrates with Dropdown */}
        <View style={[styles.card, { backgroundColor: "#FDC48C" }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconLabel}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="rice" size={20} color="white" />
              </View>
              <Text style={styles.cardText}>Carbohydrates</Text>
            </View>
            <TouchableOpacity onPress={() => setCarbExpanded(!carbExpanded)}>
              <Feather name={carbExpanded ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
          </View>
          <View style={[styles.progressBar, { backgroundColor: "#f8b06a" }]}>
            <View style={[styles.progressFill, { backgroundColor: "#E47A00", width: '60%' }]}>
              <Text style={styles.cardNote}>115g to go</Text>
            </View>
          </View>

          {carbExpanded && (
            <View style={styles.foodList}>
              {foodImages.map((imgSrc, index) => (
                <View key={index} style={styles.foodCard}>
                  <Image source={imgSrc} style={styles.foodImage} />
                  <Text style={styles.foodLabel}>
                    {[
                      "90 Second Brown Rice, Quinoa & Red Rice with Flaxseeds...",
                      "Quaker Express Maple Brown Sugar Oatmeal 1.69oz",
                      "Sliced Sourdough Bread - 17oz - Favorite Day™"
                    ][index]}
                  </Text>
                  <Feather name="chevron-right" size={20} color="#000" />
                </View>
              ))}
            </View>
          )}
        </View>

        {renderCategory("Protein", "12g to go", "#9CCEDF", "#5F99C9", "80%", "#70B9D2", <MaterialCommunityIcons name="egg" size={20} color="white" />)}
        {renderCategory("Vegetables", "Great job!", "#B4CEB3", "#87A878", "100%", "#aedfa3", <MaterialCommunityIcons name="carrot" size={20} color="white" />)}
        {renderCategory("Fruits", "1/4 cup to go", "#FAD4D8", "#E3889D", "80%", "#F4B8C6", <MaterialCommunityIcons name="fruit-cherries" size={20} color="white" />)}
        {renderCategory("Fats", "28g to go", "#FFE6B7", "#D7B351", "40%", "#E8D39B", <FontAwesome5 name="hamburger" size={20} color="white" />)}
      </ScrollView>
    </View>
  );
}

function renderCategory(
  label: string,
  note: string,
  cardColor: string,
  fillColor: string,
  fillPercent: string,
  bgColor: string,
  icon: React.ReactNode
) {
  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconLabel}>
          <View style={styles.iconCircle}>{icon}</View>
          <Text style={styles.cardText}>{label}</Text>
        </View>
        <Feather name="chevron-down" size={20} />
      </View>
      <View style={[styles.progressBar, { backgroundColor: bgColor }]}>
        <View style={[styles.progressFill, { backgroundColor: fillColor, width: fillPercent }]}>
          <Text style={styles.cardNote}>{note}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faeee8' },
  container: { padding: 20, paddingBottom: 60 },

  // Updated header layout
  header: {
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  menuIcon: {
    padding: 4,
  },
  headerBottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Manjari_700Bold',
    marginLeft: 12,
    marginTop: 12,
  },

  // Calorie
  calorieBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  calorieLeft: { alignItems: 'center' },
  calorieNumber: {
    fontSize: 48,
    fontFamily: 'PublicSans_700Bold',
  },
  calorieLabel: {
    fontSize: 16,
    fontFamily: 'Manjari_400Regular',
    marginTop: -4,
  },
  calorieGoalBox: { alignItems: 'flex-end' },
  calorieGoalLabel: {
    fontFamily: 'Manjari_400Regular',
    fontSize: 18,
  },
  calorieGoalValue: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 24,
    lineHeight: 28,
  },
  calorieBarBackground: {
    height: 12,
    backgroundColor: '#e0d8ce',
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  calorieBarFill: {
    height: '100%',
    backgroundColor: '#5b3d1f',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  // Category cards
  card: {
    borderRadius: 25,
    padding: 16,
    marginTop: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardText: {
    fontFamily: 'Manjari_700Bold',
    fontSize: 18,
  },
  progressBar: {
    height: 18,
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  cardNote: {
    fontSize: 14,
    fontFamily: 'Manjari_400Regular',
    color: 'white',
  },

  foodList: {
    marginTop: 14,
    gap: 14,
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 10,
  },
  foodLabel: {
    flex: 1,
    fontFamily: 'Manjari_400Regular',
    fontSize: 14,
  },
});
