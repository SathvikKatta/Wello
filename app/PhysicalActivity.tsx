import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type ActivityLevel = '>30 mins daily' | '30-60 mins daily' | '>60 mins daily';

export default function PhysicalActivity() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityLevel | null>(null);
  const [paramsProcessed, setParamsProcessed] = useState(false);
  
  // Process parameters when component mounts
  useEffect(() => {
    if (!paramsProcessed) {
      // Extract age parameter
      if (params.age) {
        setAge(params.age as string);
      }
      
      // Extract sex parameter
      if (params.sex) {
        setSex(params.sex as string);
      }
      
      // Extract activity parameter if coming back from next screen
      if (params.activity) {
        const activityParam = params.activity as string;
        if (
          activityParam === '>30 mins daily' || 
          activityParam === '30-60 mins daily' || 
          activityParam === '>60 mins daily'
        ) {
          setSelectedActivity(activityParam);
        }
      }
      
      setParamsProcessed(true);
    }
  }, [params, paramsProcessed]);

  // Handle activity option selection
  const handleActivitySelection = (activity: ActivityLevel) => {
    setSelectedActivity(activity);
  };

  // Navigate to the previous screen (biological sex)
  const handleBack = () => {
    router.back();
  };

  // Navigate to the next screen (health conditions)
  const handleNext = () => {
    if (selectedActivity) {
      router.push({
        pathname: '/health-conditions',
        params: {
          age: age,
          sex: sex,
          activity: selectedActivity,
          dietaryRestrictions: JSON.stringify([]), // Default empty array for dietary restrictions
          weight: '', // Empty string for weight as placeholder
          height: '' // Empty string for height as placeholder
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>
            How much <Text style={styles.highlightGreen}>physical activity</Text> do you do <Text style={styles.highlightGreen}>daily</Text>?
          </Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.lightGreenButton,
                selectedActivity === '>30 mins daily' && styles.selectedOption
              ]} 
              onPress={() => handleActivitySelection('>30 mins daily')}
            >
              <View style={styles.optionInnerContainer}>
                <Text style={styles.walkingIcon}>🚶</Text>
                <Text style={styles.optionText}>{'>30 mins daily'}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.lightBlueButton,
                selectedActivity === '30-60 mins daily' && styles.selectedOption
              ]} 
              onPress={() => handleActivitySelection('30-60 mins daily')}
            >
              <View style={styles.optionInnerContainer}>
                <Text style={styles.joggingIcon}>🏃</Text>
                <Text style={styles.optionText}>{'30-60 mins daily'}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.lightPinkButton,
                selectedActivity === '>60 mins daily' && styles.selectedOption
              ]} 
              onPress={() => handleActivitySelection('>60 mins daily')}
            >
              <View style={styles.optionInnerContainer}>
                <Text style={styles.runningIcon}>🏃‍♂️</Text>
                <Text style={styles.optionText}>{'>60 mins daily'}</Text>
              </View>
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
              !selectedActivity && styles.disabledButton
            ]} 
            onPress={handleNext}
            disabled={!selectedActivity}
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
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  optionInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightGreenButton: {
    backgroundColor: '#c8e6c9', // Light green
  },
  lightBlueButton: {
    backgroundColor: '#bbdefb', // Light blue
  },
  lightPinkButton: {
    backgroundColor: '#ffcdd2', // Light pink
  },
  selectedOption: {
    borderWidth: 3,
    borderColor: '#666',
  },
  walkingIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  joggingIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  runningIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
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