import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type ConditionType = {
  name: string;
  style: object;
};

export default function HealthConditions() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [age, setAge] = useState<string>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [paramsProcessed, setParamsProcessed] = useState(false);
  
  // Process all params only once at component mount
  useEffect(() => {
    if (!paramsProcessed) {
      // Extract age parameter
      if (params.age) {
        setAge(params.age as string);
      }
      
      // Extract dietary restrictions if available
      if (params.dietaryRestrictions) {
        try {
          const restrictionsParam = params.dietaryRestrictions as string;
          const restrictions = JSON.parse(restrictionsParam);
          setDietaryRestrictions(restrictions);
        } catch (error) {
          console.error('Error parsing dietary restrictions:', error);
        }
      }
      
      // Extract other parameters
      if (params.weight) {
        setWeight(params.weight as string);
      }
      
      if (params.height) {
        setHeight(params.height as string);
      }
      
      setParamsProcessed(true);
    }
  }, [params, paramsProcessed]);

  // Handler for health conditions selection
  const handleHealthConditionSelection = (condition: string) => {
    if (healthConditions.includes(condition)) {
      setHealthConditions(
        healthConditions.filter(item => item !== condition)
      );
    } else {
      setHealthConditions([...healthConditions, condition]);
    }
  };

  // Navigate to the previous screen (age question)
  const handleBack = () => {
    router.back();
  };

  // Submit the form
  const handleSubmit = () => {
    // Collect all form data
    const formData = {
      age,
      dietaryRestrictions,
      weight,
      height,
      healthConditions
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    Alert.alert(
      "Success",
      "Your health questionnaire has been submitted successfully!",
      [{ 
        text: "OK",
        onPress: () => {
          // Use type assertion to bypass TypeScript constraints
          router.push('/home' as any);
        }
      }]
    );
  };

  const conditions: ConditionType[] = [
    { name: 'POTS', style: styles.pinkChip },
    { name: 'Anemia', style: styles.pinkChip },
    { name: 'Diabetes', style: styles.pinkChip },
    { name: 'Underweight', style: styles.greenChip },
    { name: 'IBS', style: styles.greenChip },
    { name: 'Depression', style: styles.greenChip },
    { name: 'ARFID', style: styles.blueChip },
    { name: 'Gluten Free', style: styles.blueChip },
    { name: 'PICA', style: styles.blueChip },
    { name: 'Crohn\'s', style: styles.orangeChip },
    { name: 'High BP', style: styles.orangeChip },
    { name: 'Cholesterol', style: styles.orangeChip },
    { name: 'GERD', style: styles.pinkChip },
    { name: 'Anxiety', style: styles.pinkChip },
    { name: 'Binge Eating', style: styles.pinkChip },
    { name: 'OCD', style: styles.greenChip },
    { name: 'Heart disease', style: styles.greenChip },
    { name: 'HIV/AIDS', style: styles.greenChip },
    { name: 'Postpartum', style: styles.blueChip },
    { name: 'Kidney Disease', style: styles.blueChip },
    { name: 'Nut allergy', style: styles.orangeChip },
    { name: 'Dementia', style: styles.orangeChip },
    { name: 'Anorexia', style: styles.orangeChip },
    { name: 'Alzheimer\'s', style: styles.pinkChip },
    { name: 'Acne', style: styles.pinkChip },
    { name: 'Bulimia', style: styles.pinkChip },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <ScrollView style={styles.contentScrollContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.questionText}>
              Select all that <Text style={styles.highlightGreen}>apply to you</Text>
            </Text>
            
            <View style={styles.chipContainer}>
              {conditions.map((condition, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.chip,
                    condition.style,
                    healthConditions.includes(condition.name) && styles.selectedChip
                  ]}
                  onPress={() => handleHealthConditionSelection(condition.name)}
                >
                  <Text style={styles.chipText}>{condition.name}</Text>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={styles.otherChip}>
                <Text style={styles.otherChipText}>Other (Please Specify)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
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
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  contentScrollContainer: {
    flex: 1,
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  selectedChip: {
    borderWidth: 2,
    borderColor: '#666',
  },
  pinkChip: {
    backgroundColor: '#ffcdd2',
  },
  greenChip: {
    backgroundColor: '#c8e6c9',
  },
  blueChip: {
    backgroundColor: '#bbdefb',
  },
  orangeChip: {
    backgroundColor: '#ffe0b2',
  },
  chipText: {
    fontSize: 14,
  },
  otherChip: {
    backgroundColor: '#d7ccc8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
  },
  otherChipText: {
    fontSize: 16,
    color: '#fff',
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
  submitButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});