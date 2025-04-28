import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import NavigationBar from '../components/NavigationBar';

export default function Medicine() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts when component mounts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Manjari-Bold': require('../assets/fonts/Manjari-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Fall back to system fonts if custom font fails to load
        setFontsLoaded(true);
      }
    };
    
    loadFonts();
  }, []);

  // Go back to home screen
  const handleBackPress = () => {
    router.push('/home');
  };
  
  // Display loading state while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  }

  // Mock data for calendar days
  const calendarDays = [
    {
      id: '1',
      date: '28',
      day: 'Monday',
      month: 'April',
      isActive: false,
    },
    {
      id: '2',
      date: '29',
      day: 'Tuesday',
      month: 'April',
      isActive: true,
    },
    {
      id: '3',
      date: '30',
      day: 'Wednesday',
      month: 'April',
      isActive: false,
    },
  ];

  // Mock data for medications
  const medications = [
    {
      id: '1',
      name: 'Zoloft (Sertraline HCl) 50mg',
      instruction: 'Take Zoloft 50mg after first meal',
      image: require('../assets/images/zoloft.png'),
    },
    {
      id: '2',
      name: 'Iron 65mg',
      instruction: 'Take Iron 65mg after night meal',
      image: require('../assets/images/iron.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>My Medications</Text>
        </View>

        {/* Medication Cards - Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.medicationsScroll}
          contentContainerStyle={styles.medicationsScrollContent}
        >
          {medications.map((medication) => (
            <TouchableOpacity key={medication.id} style={styles.medicationCard}>
              <Image 
                source={medication.image} 
                style={styles.medicationImage}
                resizeMode="contain"
              />
              <View style={styles.medicationContent}>
                <Text style={styles.medicationTitle}>{medication.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pill Schedule */}
        <View style={styles.scheduleSection}>
          <Text style={styles.sectionTitle}>Pill Schedule</Text>
          
          {/* Calendar Days */}
          <View style={styles.calendarContainer}>
            {calendarDays.map((day) => (
              <View 
                key={day.id} 
                style={[
                  styles.calendarDay,
                  day.isActive ? styles.activeDay : null
                ]}
              >
                <Text style={[styles.monthText, day.isActive ? styles.activeText : null]}>{day.month}</Text>
                <Text style={[styles.dateText, day.isActive ? styles.activeText : null]}>{day.date}</Text>
                <Text style={[styles.dayText, day.isActive ? styles.activeText : null]}>{day.day}</Text>
              </View>
            ))}
          </View>
          
          {/* Medication Instructions */}
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionsList}>
              {medications.map((medication) => (
                <View key={medication.id} style={styles.instructionItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.instructionText}>{medication.instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.spacer}></View>
      </ScrollView>

      {/* Navigation Bar */}
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4EC',
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#c8a286',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Manjari-Bold',
  },
  medicationsScroll: {
    marginBottom: 15,
  },
  medicationsScrollContent: {
    paddingRight: 20,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 300,
    marginRight: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  medicationImage: {
    width: 110,
    height: 100,
    margin: 10,
  },
  medicationContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  medicationTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manjari-Bold',
  },
  scheduleSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    textAlign: 'left',
    color: 'black',
    fontSize: 33,
    fontWeight: '500',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    fontFamily: 'Manjari-Bold',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarDay: {
    width: '30%',
    backgroundColor: '#FFD1D8',
    borderRadius: 25,
    padding: 15,
    paddingVertical: 30,
    alignItems: 'center',
  },
  activeDay: {
    backgroundColor: '#FFD6A5',
  },
  activeText: {
    color: '#55330D', // Brown/orange text for active day
  },
  monthText: {
    fontSize: 16,
    fontFamily: 'Manjari-Bold',
    color: '#6A0C38',
  },
  dateText: {
    paddingTop: 9,
    fontSize: 62,
    fontWeight: 'bold',
    fontFamily: 'Manjari-Bold',
    color: '#6A0C38',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Manjari-Bold',
    color: '#6A0C38',
  },
  instructionsContainer: {
    paddingTop:40,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionsList: {
    marginTop: 5,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 22,
    marginRight: 8,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 22,
    lineHeight: 32,
    fontFamily: 'Manjari-Bold',
  },
  spacer: {
    height: 90, // Ensures content isn't hidden behind the navigation bar
  },
});