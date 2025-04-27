import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// Import the NavigationBar component
import NavigationBar from '../components/NavigationBar';

export default function Home() {
  // Mock data for recommendations
  const recommendations = [
    {
      id: '1',
      name: 'Multi-Grain Cherrios',
      description: 'This iron-fortified cereal can provide a good breakfast and supplies essential nutrients',
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      description: 'Great source of fiber and complex carbohydrates',
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      description: 'High in protein and probiotics for gut health',
    },
    {
      id: '4',
      name: 'Salmon',
      description: 'Rich in omega-3 fatty acids and lean protein',
    },
  ];

  // Direct navigation function
  const navigateToScreen = (screen: string) => {
    window.location.href = screen;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileImage} />
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuLine}></View>
          <View style={styles.menuLine}></View>
          <View style={styles.menuLine}></View>
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome, Veronica</Text>

      {/* Main Content Scroll */}
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        {/* Today's Plate Section */}
        <View style={styles.plateSection}>
          <Text style={styles.sectionTitle}>Today's Plate</Text>
          <View style={styles.plateContainer}>
            {/* Replace the placeholder view with the plate image */}
            <Image 
              source={require('../assets/images/plate.png')} 
              style={styles.plateImage}
              resizeMode="contain"
            />
            <TouchableOpacity 
              style={styles.medicineButton}
              onPress={() => navigateToScreen('/medicine')}
            >
              {/* Replace the placeholder view with the medicine button image */}
              <Image 
                source={require('../assets/images/medicineButton.png')} 
                style={styles.medicineIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Recommendations Section */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Daily Recommendations</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendationsScroll}
            contentContainerStyle={styles.recommendationsScrollContent}
          >
            {recommendations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recommendationCard}>
                {/* Use the appropriate image for each recommendation */}
                {item.id === '1' && (
                  <Image 
                    source={require('../assets/images/cheerios.png')} 
                    style={styles.recommendationImage}
                    resizeMode="contain"
                  />
                )}
                {item.id === '2' && (
                  <Image 
                    source={require('../assets/images/bread.png')} 
                    style={styles.recommendationImage}
                    resizeMode="contain"
                  />
                )}
                {item.id === '3' && (
                  <Image 
                    source={require('../assets/images/yogurt.png')} 
                    style={styles.recommendationImage}
                    resizeMode="contain"
                  />
                )}
                {item.id === '4' && (
                  <Image 
                    source={require('../assets/images/salmon.webp')} 
                    style={styles.recommendationImage}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>{item.name}</Text>
                  <Text style={styles.recommendationDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Additional content sections can be added here */}
        <View style={styles.spacer}></View>
      </ScrollView>

      {/* Navigation Bar */}
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4EC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c8a286',
  },
  menuButton: {
    justifyContent: 'space-between',
    height: 20,
  },
  menuLine: {
    width: 30,
    height: 3,
    backgroundColor: '#c8a286',
    marginVertical: 2,
    borderRadius: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 20,
    fontFamily: 'Manjari-Bold',
  },
  contentScroll: {
    flex: 1,
  },
  plateSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    backgroundColor: '#c8a286',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    fontFamily: 'Manjari-Bold',
  },
  plateContainer: {
    position: 'relative',
    backgroundColor: '#f2e4d8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
  },
  plateImage: {
    width: 230,
    height: 230,
    borderRadius: 115,
  },
  medicineButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineIcon: {
    width: 24,
    height: 24,
  },
  recommendationsSection: {
    paddingHorizontal: 20,
  },
  recommendationsScroll: {
    marginBottom: 20,
  },
  recommendationsScrollContent: {
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 300,
    marginRight: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationImage: {
    width: 110,
    height: 130,
    margin: 10,
  },
  recommendationContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Manjari-Bold',
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    fontFamily: 'Manjari-Bold',
  },
  spacer: {
    height: 90, // Ensures content isn't hidden behind the navigation bar
  },
});