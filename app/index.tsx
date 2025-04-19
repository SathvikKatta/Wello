
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

// Function to load the custom font
const loadFonts = async () => {
  await Font.loadAsync({
    'Manjari-Bold': require('../assets/fonts/Manjari-Bold.ttf'),
  });
};

export default function Index() {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  // Load fonts when the component mounts
  useEffect(() => {
    const loadAndSetFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    
    loadAndSetFonts();
  }, []);

  // Handler for dietary restrictions selection
  const handleDietarySelection = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(
        dietaryRestrictions.filter(item => item !== restriction)
      );
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  // Navigate to the next screen and pass the data
  const handleNext = () => {
    router.push({
      pathname: '/weight-height',
      params: {
        dietaryRestrictions: JSON.stringify(dietaryRestrictions)
      }
    });
  };

  // Display a loading state while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>
            Do you have any <Text style={styles.highlightGreen}>dietary restrictions</Text>?
          </Text>
          
          <TouchableOpacity
            style={[
              styles.optionButton, 
              styles.pinkOption,
              dietaryRestrictions.includes('Vegetarian') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Vegetarian')}
          >
            <Text style={styles.optionText}>Vegetarian</Text>
            <Image source={require('../assets/images/carrot.png')} style={styles.optionImage} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton, 
              styles.greenOption,
              dietaryRestrictions.includes('Vegan') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Vegan')}
          >
            <Text style={styles.optionText}>Vegan</Text>
            <Image source={require('../assets/images/salad.png')} style={styles.optionImage} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton, 
              styles.blueOption,
              dietaryRestrictions.includes('Kosher') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Kosher')}
          >
            <Text style={styles.optionText}>Kosher</Text>
            <Image source={require('../assets/images/star.png')} style={styles.optionImage} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton, 
              styles.orangeOption,
              dietaryRestrictions.includes('Halal') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Halal')}
          >
            <Text style={styles.optionText}>Halal</Text>
            <Image source={require('../assets/images/moon.png')} style={styles.optionImage} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionButton, 
              styles.purpleOption,
              dietaryRestrictions.includes('Other') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Other')}
          >
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 10,
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#faf3e8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    fontFamily: 'Manjari-Bold',
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fad9c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Manjari-Bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Manjari-Bold',
  },
  highlightGreen: {
    color: '#4caf50',
    fontFamily: 'Manjari-Bold',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  pinkOption: {
    backgroundColor: '#ffcdd2',
  },
  greenOption: {
    backgroundColor: '#c8e6c9',
  },
  blueOption: {
    backgroundColor: '#bbdefb',
  },
  orangeOption: {
    backgroundColor: '#ffe0b2',
  },
  purpleOption: {
    backgroundColor: '#d1c4e9',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#666',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Manjari-Bold',
  },
  optionImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navigationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Manjari-Bold',
  },
});