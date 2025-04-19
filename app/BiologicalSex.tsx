import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type SexOption = 'Male' | 'Female' | 'Intersex';

export default function BiologicalSex() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [age, setAge] = useState<string>('');
  const [selectedSex, setSelectedSex] = useState<SexOption | null>(null);
  const [paramsProcessed, setParamsProcessed] = useState(false);
  
  // Process parameters when component mounts
  useEffect(() => {
    if (!paramsProcessed) {
      // Extract age parameter
      if (params.age) {
        setAge(params.age as string);
      }
      
      // Extract sex parameter if coming back from next screen
      if (params.sex) {
        const sexParam = params.sex as string;
        if (sexParam === 'Male' || sexParam === 'Female' || sexParam === 'Intersex') {
          setSelectedSex(sexParam);
        }
      }
      
      setParamsProcessed(true);
    }
  }, [params, paramsProcessed]);

  // Handle sex option selection
  const handleSexSelection = (sex: SexOption) => {
    setSelectedSex(sex);
  };

  // Navigate to the previous screen (age question)
  const handleBack = () => {
    router.back();
  };

  // Navigate to the next screen (health conditions)
  const handleNext = () => {
    if (selectedSex) {
      router.push({
        pathname: "/PhysicalActivity", // Try without the leading slash
        params: {
          age: age,
          sex: selectedSex
        }
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>
            What is your <Text style={styles.highlightGreen}>biological sex</Text>?
          </Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.maleButton,
                selectedSex === 'Male' && styles.selectedOption
              ]} 
              onPress={() => handleSexSelection('Male')}
            >
              <Text style={styles.optionText}>Male</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.femaleButton,
                selectedSex === 'Female' && styles.selectedOption
              ]} 
              onPress={() => handleSexSelection('Female')}
            >
              <Text style={styles.optionText}>Female</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.intersexButton,
                selectedSex === 'Intersex' && styles.selectedOption
              ]} 
              onPress={() => handleSexSelection('Intersex')}
            >
              <Text style={styles.optionText}>Intersex</Text>
            </TouchableOpacity>
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
            style={[
              styles.nextButton, 
              !selectedSex && styles.disabledButton
            ]} 
            onPress={handleNext}
            disabled={!selectedSex}
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
    marginBottom: 50,
    textAlign: 'center',
  },
  highlightGreen: {
    color: '#4caf50',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '80%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  maleButton: {
    backgroundColor: '#c8e6c9', // Light green
  },
  femaleButton: {
    backgroundColor: '#bbdefb', // Light blue
  },
  intersexButton: {
    backgroundColor: '#ffcdd2', // Light pink
  },
  selectedOption: {
    borderWidth: 3,
    borderColor: '#666',
  },
  optionText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#d4a88e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d4a88e80', // Add transparency to show it's disabled
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});