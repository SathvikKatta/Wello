import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
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
  }, [params.age, params.dietaryRestrictions, params.weight, params.height, paramsProcessed]);

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

  // Navigate to the Perfect completion screen
  const handleNext = () => {
    // Collect all form data
    const formData = {
      age,
      dietaryRestrictions,
      weight,
      height,
      healthConditions
    };
    
    console.log('Form data collected:', formData);
    
    // Navigate to the Perfect completion screen
    router.push({
      pathname: '/PerfectScreen',
      params: {
        formData: JSON.stringify(formData)
      }
    });
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
                  <Text style={[
                    styles.chipText, 
                    condition.style === styles.pinkChip ? styles.pinkText : 
                    condition.style === styles.greenChip ? styles.greenText :
                    condition.style === styles.blueChip ? styles.blueText :
                    condition.style === styles.orangeChip ? styles.orangeText : null
                  ]}>
                    {condition.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity style={styles.otherButton}>
              <Text style={styles.otherButtonText}>Other (Please Specify)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Image 
              source={require('../assets/images/circle.png')} 
              style={styles.arrowIcon} 
            />
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
    marginTop:40,

    flex: 1,
    backgroundColor: '#faf3e8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contentContainer: {
    marginTop:40,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100, // Add space at the bottom for scrolling
  },
  contentScrollContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Manjari-Bold',
  },
  highlightGreen: {
    color: '#4caf50',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    margin: 4,
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
    fontWeight: 'bold',
    fontFamily: 'Manjari-Bold',
  },
  pinkText: {
    color: '#6A0C38',
  },
  greenText: {
    color: '#0C381E',
  },
  blueText: {
    color: '#054359',
  },
  orangeText: {
    color: '#55330D',
  },
  otherButton: {
    backgroundColor: '#D2B48C', // Light brown/tan color
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  otherButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manjari-Bold',
    textAlign: 'center',
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