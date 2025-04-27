import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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

  // Navigate to the next screen (health conditions)
  const handleNext = () => {
    if (selectedSex) {
      router.push({
        pathname: "/PhysicalActivity",
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
              <Text style={[styles.optionText, styles.maleText]}>Male</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.femaleButton,
                selectedSex === 'Female' && styles.selectedOption
              ]} 
              onPress={() => handleSexSelection('Female')}
            >
              <Text style={[styles.optionText, styles.femaleText]}>Female</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                styles.intersexButton,
                selectedSex === 'Intersex' && styles.selectedOption
              ]} 
              onPress={() => handleSexSelection('Intersex')}
            >
              <Text style={[styles.optionText, styles.intersexText]}>Intersex</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
            disabled={!selectedSex}
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
    fontFamily: 'Manjari-Bold',
    fontSize: 32,
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
    width: '60%', // Less wide
    padding: 20,
    borderRadius: 30,
    alignItems: 'center', // Center the text
    justifyContent: 'center', // Center the text vertically
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
    marginTop:10,
    fontSize: 36,
    fontFamily: 'Manjari-Bold',
    fontWeight: 'bold',
    textAlign: 'center', // Ensure text is centered
  },
  maleText: {
    color: '#0C381E', // Dark green color
  },
  femaleText: {
    color: '#054359', // Deep blue color
  },
  intersexText: {
    color: '#6A0C38', // Burgundy color
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