import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WeightHeight() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  
  // References for input fields
  const weightInputRef = useRef<TextInput>(null);
  const heightInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Extract dietary restrictions from params
    if (params.dietaryRestrictions) {
      try {
        const restrictionsParam = params.dietaryRestrictions as string;
        const restrictions = JSON.parse(restrictionsParam);
        setDietaryRestrictions(restrictions);
      } catch (error) {
        console.error('Error parsing dietary restrictions:', error);
      }
    }
  }, [params.dietaryRestrictions]);

  // Toggle weight unit between kg and lbs
  const toggleWeightUnit = () => {
    if (weightUnit === 'kg') {
      setWeightUnit('lbs');
      // Convert kg to lbs if there's a value
      if (weight) {
        const lbs = Math.round(parseFloat(weight) * 2.20462);
        setWeight(lbs.toString());
      }
    } else {
      setWeightUnit('kg');
      // Convert lbs to kg if there's a value
      if (weight) {
        const kg = Math.round(parseFloat(weight) / 2.20462);
        setWeight(kg.toString());
      }
    }
  };

  // Toggle height unit between cm and inches
  const toggleHeightUnit = () => {
    if (heightUnit === 'cm') {
      setHeightUnit('in');
      // Convert cm to inches if there's a value
      if (height) {
        const inches = Math.round(parseFloat(height) / 2.54);
        setHeight(inches.toString());
      }
    } else {
      setHeightUnit('cm');
      // Convert inches to cm if there's a value
      if (height) {
        const cm = Math.round(parseFloat(height) * 2.54);
        setHeight(cm.toString());
      }
    }
  };

  // Dismiss keyboard when tapping outside input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Navigate to the previous screen
  const handleBack = () => {
    router.back();
  };

  // Navigate to the next screen and pass the data
  const handleNext = () => {
    // Convert all measurements to metric before passing to next screen
    let metricWeight = weight;
    let metricHeight = height;
    
    // Convert to metric if needed
    if (weightUnit === 'lbs' && weight) {
      metricWeight = (parseFloat(weight) / 2.20462).toFixed(1);
    }
    
    if (heightUnit === 'in' && height) {
      metricHeight = (parseFloat(height) * 2.54).toFixed(1);
    }
    
    router.push({
      pathname: '/age-question',
      params: {
        dietaryRestrictions: JSON.stringify(dietaryRestrictions),
        weight: metricWeight,
        height: metricHeight
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
  
          
          <View style={styles.contentContainer}>
            <Text style={styles.questionText}>
              What's your <Text style={styles.highlightGreen}>weight</Text> and <Text style={styles.highlightGreen}>height</Text>?
            </Text>
            
            <View style={styles.measurementContainer}>
              {/* Human figure */}
              <View style={styles.humanIconContainer}>
                <Image 
                  source={require('../assets/images/humanIcon.png')} 
                  style={styles.humanIcon}
                  resizeMode="contain"
                />
              </View>
              
              <View style={styles.inputsContainer}>
                <View style={styles.inputGroup}>
                  <View style={styles.inputWithLabel}>
                    <Text style={styles.labelText}>Weight</Text>
                    <TextInput
                      ref={weightInputRef}
                      style={styles.inputField}
                      value={weight}
                      onChangeText={setWeight}
                      keyboardType="numeric"
                      placeholder=""
                      returnKeyType="done"
                      onSubmitEditing={dismissKeyboard}
                    />
                  </View>
                  <View style={styles.unitLabelsContainer}>
                    <TouchableOpacity onPress={toggleWeightUnit} style={styles.unitToggle}>
                      <View style={[styles.unitOption, weightUnit === 'lbs' ? styles.activeUnitOption : styles.inactiveUnitOption]}>
                        <Text style={styles.unitText}>Lbs</Text>
                      </View>
                      <View style={[styles.unitOption, weightUnit === 'kg' ? styles.activeUnitOption : styles.inactiveUnitOption]}>
                        <Text style={styles.unitText}>Kgs</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.inputWithLabel}>
                    <Text style={styles.labelText}>Height</Text>
                    <TextInput
                      ref={heightInputRef}
                      style={styles.inputField}
                      value={height}
                      onChangeText={setHeight}
                      keyboardType="numeric"
                      placeholder=""
                      returnKeyType="done"
                      onSubmitEditing={dismissKeyboard}
                    />
                  </View>
                  <View style={styles.unitLabelsContainer}>
                    <TouchableOpacity onPress={toggleHeightUnit} style={styles.unitToggle}>
                      <View style={[styles.unitOption, heightUnit === 'in' ? styles.activeUnitOption : styles.inactiveUnitOption]}>
                        <Text style={styles.unitText}>In</Text>
                      </View>
                      <View style={[styles.unitOption, heightUnit === 'cm' ? styles.activeUnitOption : styles.inactiveUnitOption]}>
                        <Text style={styles.unitText}>Cm</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
    </TouchableWithoutFeedback>
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
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 80, // Move content down more
    alignItems: 'center', // Center all content
  },
  questionText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50, // More space below question
    textAlign: 'center',
    fontFamily: 'Manjari-Bold'
  },
  highlightGreen: {
    color: '#4caf50',
  },
  measurementContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    width: '90%',
    marginTop: 40,
    paddingBottom: 60, // Add space at the bottom
  },
  humanIconContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  humanIcon: {
    top:-26,
    width: 100,
    height: 220, // Make the human icon taller
  },
  inputsContainer: {

    flex: 1.2,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  inputGroup: {
    marginBottom: 25, // More space between input groups
    width: '100%',
  },
  inputWithLabel: {
    position: 'relative', // For absolute positioning of label
    width: '100%',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute', // Position label on top of the input field
    left: 10,
    top: -25, // Position label above input field
    zIndex: 1, // Ensure label appears above input field
  },
  inputField: {
    backgroundColor: '#ffcdd2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
    marginBottom: 8,
    height: 50, // Taller input field
  },
  unitLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom:25
  },
  unitToggle: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e3e3e3',
  },
  unitOption: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  activeUnitOption: {
    backgroundColor: '#d0b89c', // Brown color for active unit
  },
  inactiveUnitOption: {
    backgroundColor: '#e0e0e0', // Light gray for inactive unit
  },
  unitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});