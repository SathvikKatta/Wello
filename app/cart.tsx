import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function GroceryListPlanner() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState(10); // Default to middle day (10th)
  const [activeSection, setActiveSection] = useState('general'); // 'general' or 'breakfast'
  
  const currentDate = "For Week April 6th, 2025";
  
  // Days of the week data
  const days = [
    { day: 9, month: 'April' },
    { day: 10, month: 'April' },
    { day: 11, month: 'April' }
  ];

  // General section items
  const generalItems = [
    {
      id: '1',
      title: 'Budget Friendly',
      description: 'GOYA Premium Black Pinto, 15.5 oz'
    },
    {
      id: '2',
      title: 'Craving Kenyan?',
      description: 'Sukuma Wiki'
    }
  ];

  // Breakfast section items
  const breakfastItems = [
    {
      id: '1',
      title: 'Indulge Your Sweet Tooth',
      description: 'Frosted Corn Flakes Cereal - Non-GMO'
    },
    {
      id: '2',
      title: 'Start Healthy!',
      description: 'Plain Greek Yogurt (contains live cultures)'
    },
    {
      id: '3',
      title: 'Healthy Grab & Go Option',
      description: 'Organic Bananas'
    }
  ];

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

      {/* Title */}
      <Text style={styles.title}>Grocery List Planner</Text>
      <Text style={styles.subtitle}>{currentDate}</Text>

      {/* Day selection */}
      <View style={styles.daySelectionContainer}>
        {days.map((day, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.dayCard, 
              activeDay === day.day ? 
                (activeSection === 'general' ? styles.activeDayCardGeneral : styles.activeDayCardBreakfast) : 
                styles.inactiveDayCard
            ]}
            onPress={() => setActiveDay(day.day)}
          >
            <Text style={styles.monthText}>{day.month}</Text>
            <Text style={styles.dayText}>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab selection */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeSection === 'general' && styles.activeTabButton]}
          onPress={() => setActiveSection('general')}
        >
          <Text style={styles.tabText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeSection === 'breakfast' && styles.activeTabButton]}
          onPress={() => setActiveSection('breakfast')}
        >
          <Text style={styles.tabText}>Breakfast</Text>
        </TouchableOpacity>
      </View>

      {/* Item list */}
      <ScrollView style={styles.itemsScrollView}>
        <View style={styles.itemsContainer}>
          {activeSection === 'general' ? 
            generalItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemContent}>
                  <View style={styles.itemImagePlaceholder} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
              </View>
            )) :
            breakfastItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemContent}>
                  <View style={styles.itemImagePlaceholder} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home' as any)}
        >
          <View style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <View style={styles.navIcon} />
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 20,
    marginBottom: 20,
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dayCard: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeDayCardGeneral: {
    backgroundColor: '#c8e6c9', // Light green for general
  },
  activeDayCardBreakfast: {
    backgroundColor: '#f8bbd0', // Light pink for breakfast
  },
  inactiveDayCard: {
    backgroundColor: '#e0f2f1', // Light teal for inactive
  },
  monthText: {
    fontSize: 14,
    color: '#666666',
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 8,
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#c8a286',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemsScrollView: {
    flex: 1,
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  itemCard: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  spacer: {
    height: 90, // To ensure content isn't hidden behind navigation bar
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: '#c8a286',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#c8a286',
    borderRadius: 12,
  },
});