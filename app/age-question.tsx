import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function AgeQuestion() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [age, setAge] = useState<number>(35);
  
  // Extract parameters if coming back from next screen
  useEffect(() => {
    if (params.age) {
      try {
        const ageParam = params.age as string;
        const parsedAge = parseInt(ageParam, 10);
        if (!isNaN(parsedAge) && parsedAge !== age) {
          setAge(parsedAge);
        }
      } catch (error) {
        console.error('Error parsing age:', error);
      }
    }
  }, [params.age]); // Only depend on params.age, not age itself

  // Handle the slider change
  const handleSliderChange = (value: number) => {
    setAge(Math.round(value));
  };

  // Navigate to the health conditions screen
  const handleNext = () => {
    router.push({
      pathname: '/BiologicalSex',
      params: {
        age: age.toString()
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>
            What is your <Text style={styles.highlightGreen}>age</Text>?
          </Text>
          
          <View style={styles.ageDisplayContainer}>
            <Text style={styles.ageDisplay}>{age}</Text>
          </View>
          
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={99}
              step={1}
              value={age}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#d4a88e"
              maximumTrackTintColor="#e8d1c5"
              thumbTintColor="#8b4513"
            />
            <View style={styles.sliderLabelsContainer}>
              <Text style={styles.sliderLabel}>1</Text>
              <Text style={styles.sliderLabel}>99+</Text>
            </View>
          </View>
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
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  highlightGreen: {
    color: '#4caf50',
  },
  ageDisplayContainer: {
    backgroundColor: '#ffcdd2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  ageDisplay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  sliderLabel: {
    backgroundColor: '#ffcdd2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontSize: 14,
  },
  navigationContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#d4a88e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});