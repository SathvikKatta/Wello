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
      pathname: '/health-conditions',
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
              {/* Human figure placeholder for PNG */}
              <View style={styles.humanIconContainer}>
                {<Image 
    source={require('../assets/images/humanIcon.png')} 
    resizeMode="contain"
  />}
                <View style={styles.humanIconPlaceholder} />
              </View>
              
              <View style={styles.inputsContainer}>
                <Text style={styles.labelText}>Weight</Text>
                <View style={styles.inputWithLabelsContainer}>
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
                
                <Text style={styles.labelText}>Height</Text>
                <View style={styles.inputWithLabelsContainer}>
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
              style={styles.backButton} 
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
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
  },
  highlightGreen: {
    color: '#4caf50',
  },
  measurementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  humanIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  humanIconPlaceholder: {
    width: 80,
    height: 200,
    borderRadius: 40,
  },
  inputsContainer: {
    flex: 1.5,
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  inputWithLabelsContainer: {
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: '#ffcdd2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    width: '100%',
    marginBottom: 3,
  },
  unitLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
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
    backgroundColor: '#d0b89c',
  },
  inactiveUnitOption: {
    backgroundColor: '#e3e3e3',
  },
  unitText: {
    fontSize: 14,
    color: '#000',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: 150,
  },
  backButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});