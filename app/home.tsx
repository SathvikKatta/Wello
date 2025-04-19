import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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
            <View style={styles.plateImage} />
            <TouchableOpacity 
              style={styles.medicineButton}
              onPress={() => navigateToScreen('/medicine')}
            >
              <View style={styles.medicineIcon} />
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
                <View style={styles.recommendationImage} />
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
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
    borderRadius: 12,
    backgroundColor: '#c8a286',
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
    backgroundColor: '#f2e4d8',
    borderRadius: 15,
    width: 200,
    marginRight: 15,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#ffffff',
  },
  recommendationContent: {
    padding: 10,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  recommendationDescription: {
    fontSize: 12,
    color: '#666',
  },
  spacer: {
    height: 90, // Ensures content isn't hidden behind the navigation bar
  },
});