import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import { useRouter } from 'expo-router';

// Interface for meal items
interface MealItem {
  id: string;
  title: string;
  description: string;
}

// Type for meal sections
type MealSectionType = 'general' | 'breakfast' | 'lunch' | 'dinner';

// Main component
export default function GroceryListPlanner() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState<number | null>(null); // Start with no active day
  const [activeSection, setActiveSection] = useState<MealSectionType>('general');
  
  const currentDate = "For Week April 6th, 2025";
  
  // Days of the week data
  const days = [
    { day: 9, month: 'April', dayName: 'Wednesday' },
    { day: 10, month: 'April', dayName: 'Thursday' },
    { day: 11, month: 'April', dayName: 'Friday' }
  ];

  // General section items (for initial view)
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

  // Breakfast items
  const breakfastItems: MealItem[] = [
    {
      id: '1',
      title: 'Frozen Cut Leaf Spinach',
      description: '10oz - Good & Gather™'
    },
    {
      id: '2',
      title: 'Feta Cheese Crumbles',
      description: '6oz - Good & Gather™'
    },
    {
      id: '3',
      title: 'Sunnys Grade A Large White Eggs',
      description: ''
    }
  ];

  // Handle day selection
  const handleDayPress = (day: typeof days[0]) => {
    if (activeDay === day.day) {
      // If already active, clicking again should go back to general view
      setActiveDay(null);
      setActiveSection('general');
    } else {
      setActiveDay(day.day);
      setActiveSection('breakfast'); // Default to breakfast when selecting a day
    }
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
              activeDay === day.day ? styles.activeDayCard : styles.inactiveDayCard
            ]}
            onPress={() => handleDayPress(day)}
          >
            <Text style={styles.monthText}>{day.month}</Text>
            <Text style={styles.dayText}>{day.day}</Text>
            <Text style={styles.dayNameText}>{day.dayName}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content based on selected day/section */}
      {activeDay === null ? (
        // Default view - show general categories
        <ScrollView style={styles.itemsScrollView}>
          <View style={styles.contentContainer}>
            {generalItems.map((item) => (
              <View key={item.id} style={styles.generalItemCard}>
                <Text style={styles.generalItemTitle}>{item.title}</Text>
                <View style={styles.generalItemContent}>
                  <View style={styles.generalItemImagePlaceholder} />
                  <View style={styles.generalItemDetails}>
                    <Text style={styles.generalItemDescription}>{item.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.spacer} />
        </ScrollView>
      ) : (
        // Day-specific view - show the view exactly as in the image
        <ScrollView style={styles.itemsScrollView}>
          <View style={styles.contentContainer}>
            {/* Breakfast Tab */}
            <TouchableOpacity 
              style={styles.breakfastTab}
              onPress={() => setActiveSection('breakfast')}
            >
              <Text style={styles.tabText}>Breakfast</Text>
              <Text style={styles.expandIcon}>∧</Text>
            </TouchableOpacity>
            
            {/* Breakfast Items (inside the pink breakfast tab) */}
            <Text style={styles.recipeTitle}>Spinach Feta Quiche</Text>
            
            {breakfastItems.map((item, index) => (
              <View key={index} style={styles.breakfastItemCard}>
                <View style={styles.breakfastItemImagePlaceholder} />
                <View style={styles.breakfastItemDetails}>
                  <Text style={styles.breakfastItemDescription}>
                    {item.title}
                    {item.description ? ` - ${item.description}` : ''}
                  </Text>
                </View>
              </View>
            ))}
            
            {/* Budget Friendly Section (below the breakfast tab) */}
            <View style={styles.budgetFriendlySection}>
              <Text style={styles.sectionTitle}>Budget Friendly</Text>
              <View style={styles.budgetItemsRow}>
                <View style={styles.budgetItem}>
                  <View style={styles.budgetItemImagePlaceholder} />
                  <Text style={styles.budgetItemText}>GOYA Premium Chick Peas, 15.5 oz</Text>
                </View>
                <View style={styles.budgetItem}>
                  <View style={styles.budgetItemImagePlaceholder} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.spacer} />
        </ScrollView>
      )}

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
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeDayCard: {
    backgroundColor: '#c8e6c9', // Light green for active
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
  dayNameText: {
    fontSize: 12,
    color: '#666666',
  },
  
  // Scroll view and containers
  itemsScrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  
  // General item styles (initial view)
  generalItemCard: {
    marginBottom: 20,
  },
  generalItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  generalItemContent: {
    flexDirection: 'row',
  },
  generalItemImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
  },
  generalItemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  generalItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  
  // Breakfast tab styles (day-specific view)
  breakfastTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8bbd0', // Pink background for the entire tab
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    marginBottom: 0, // No margin bottom as the content is part of the tab
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Recipe title and breakfast items (also part of the pink area)
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#f8bbd0', // Pink background continuing from the tab
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  breakfastItemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // White cards
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    // Pink background behind these cards provided by the parent container
  },
  breakfastItemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
  },
  breakfastItemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  breakfastItemDescription: {
    fontSize: 12,
    color: '#333',
  },
  
  // Budget friendly section (below the breakfast section)
  budgetFriendlySection: {
    backgroundColor: '#ffffff', // White background, separate from the breakfast section
    marginTop: 20, // Space between breakfast items and budget section
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  budgetItemsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetItem: {
    width: '48%',
  },
  budgetItemImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    marginBottom: 5,
  },
  budgetItemText: {
    fontSize: 12,
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