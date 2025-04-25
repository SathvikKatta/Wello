import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type ActivityLevel = '<30 mins daily' | '30-60 mins daily' | '>60 mins daily';

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
          activityParam === '<30 mins daily' || 
          activityParam === '30-60 mins daily' || 
          activityParam === '>60 mins daily'
        ) {
          setSelectedActivity(activityParam);
        }
      }
      
      setParamsProcessed(true);
    }
  }, [params.age, params.sex, params.activity, paramsProcessed]);

  // Handle activity option selection
  const handleActivitySelection = (activity: ActivityLevel) => {
    setSelectedActivity(activity);
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
                selectedActivity === '<30 mins daily' && styles.selectedOption
              ]} 
              onPress={() => handleActivitySelection('<30 mins daily')}
            >
              <View style={styles.optionInnerContainer}>
                <Image
                  source={require('../assets/images/walk.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>{'<30 mins'}</Text>
                  <Text style={styles.optionText}>daily</Text>
                </View>
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
                <Image
                  source={require('../assets/images/jog.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>30-60</Text>
                  <Text style={styles.optionText}>mins daily</Text>
                </View>
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
                <Image
                  source={require('../assets/images/sprint.png')}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>{'>60 mins'}</Text>
                  <Text style={styles.optionText}>daily</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
            disabled={!selectedActivity}
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
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 10,
  },
  questionContainer: {
    flex: 1,
    paddingTop:90,

    backgroundColor: '#faf3e8',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Manjari-Bold'
  },
  highlightGreen: {
    color: '#4caf50',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '90%',
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  optionInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
    borderWidth: 2,
    borderColor: '#666',
  },
  activityIcon: {
    width: 40,
    height: 40,
    marginRight: 0,
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'Manjari-Bold',
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