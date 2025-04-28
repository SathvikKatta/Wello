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
            Do you have any{'\n'}<Text style={styles.highlightGreen}>dietary restrictions</Text>?
          </Text>
         
          <TouchableOpacity
            style={[
              styles.optionButton,
              styles.pinkOption,
              dietaryRestrictions.includes('Vegetarian') && styles.selectedOption
            ]}
            onPress={() => handleDietarySelection('Vegetarian')}
          >
            <Text style={[styles.optionText, { color: '#6A0C38' }]}>Vegetarian</Text>
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
            <Text style={[styles.optionText, { color: '#0C381E' }]}>Vegan</Text>
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
            <Text style={[styles.optionText, { color: '#054359' }]}>Kosher</Text>
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
            <Text style={[styles.optionText, { color: '#55330D' }]}>Halal</Text>
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
            <Image source={require('../assets/images/otherButton.png')} style={styles.optionImage} />
          </TouchableOpacity>
        </View>
       
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Image source={require('../assets/images/circle.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    fontFamily: 'Manjari-Bold',
  },
  contentContainer: {
    marginTop:70,
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center', // Center the options horizontally
  },
  questionText: {
    fontSize: 32,
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
    width: '90%', // Constrains width to enable centering
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
    alignItems: 'flex-end', // Align to the right
    justifyContent: 'flex-end', // Align to the bottom
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  nextButton: {
    backgroundColor: 'transparent', // Making it transparent since we're using an image
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
