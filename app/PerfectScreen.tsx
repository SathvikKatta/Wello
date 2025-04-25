import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PerfectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Handle next button press to navigate to home
  const handleNext = () => {
    router.push({
      pathname: '/home',
      params: {
        // Pass along any necessary data from the health conditions screen
        formData: params.formData
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
   
        {/* Main content with images */}
        <View style={styles.mainContainer}>
          {/* Background circles */}
          <Image 
            source={require('../assets/images/orangeCircle.png')} 
            style={[styles.circle, styles.orangeCircle]} 
            resizeMode="contain"
          />
          
          <Image 
            source={require('../assets/images/blueCircle.png')} 
            style={[styles.circle, styles.blueCircle]} 
            resizeMode="contain"
          />
          
          <Image 
            source={require('../assets/images/pinkCircle.png')} 
            style={[styles.circle, styles.pinkCircle]} 
            resizeMode="contain"
          />
          
          <Image 
            source={require('../assets/images/greenCircle.png')} 
            style={[styles.circle, styles.greenCircle]} 
            resizeMode="contain"
          />
          

          

          
          {/* Centered lotus/weed with Perfect text */}
          <View style={styles.perfectContainer}>
            <Image 
              source={require('../assets/images/weed.png')} 
              style={styles.weed} 
              resizeMode="contain"
            />
            <Text style={styles.perfectText}>Perfect!</Text>
          </View>
        </View>
        
        {/* Next button */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Image 
              source={require('../assets/images/circle.png')} 
              style={styles.arrowIcon} 
              resizeMode="contain"
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
  contentContainer: {
    flex: 1,
    backgroundColor: '#faf3e8',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  headerContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  // Circle styles
  circle: {
    position: 'absolute',
  },
  orangeCircle: {
    width: 280,
    height: 280,
    top: -80,
    left: -100,
  },
  blueCircle: {
    width: 240,
    height: 240,
    top: 100,
    right: -80,
  },
  pinkCircle: {
    width: 200,
    height: 200,
    bottom: -50,
    right: -50,
  },
  greenCircle: {
    width: 180,
    height: 180,
    bottom: -30,
    left: -30,
  },
  // Food icons
  eggs: {
    position: 'absolute',
    width: 70,
    height: 70,
    top: 250,
    right: 50,
  },
  orange: {
    position: 'absolute',
    width: 80,
    height: 80,
    bottom: 320,
    left: 70,
  },
  carrot: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 70,
    right: 70,
  },
  // Lotus and Perfect text
  perfectContainer: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    transform: [{ translateX: -70 }, { translateY: -70 }],
    alignItems: 'center',
  },
  weed: {
    width: 240,
    height: 240,
    marginBottom: 15,
  },
  perfectText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#B08968', // Light brown color for "Perfect!"
    fontFamily: 'Manjari-Bold',
  },
  // Navigation
  navigationContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
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
    marginTop:-70,
    marginLeft:30,
    resizeMode: 'contain',
  },
});