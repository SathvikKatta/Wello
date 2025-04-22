import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface MealTabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  items: Array<{id: string; title: string; description: string}>;
  bgColor: string;
}

const MealTab: React.FC<MealTabProps> = ({ title, isActive, onPress, items, bgColor }) => {
  return (
    <TouchableOpacity 
      style={[styles.mealTab, { backgroundColor: isActive ? bgColor : '#f8f8f8' }]}
      onPress={onPress}
    >
      <View style={styles.mealTabContent}>
        <Text style={styles.mealTabText}>{title}</Text>
        
        {isActive && (
          <View style={styles.mealItemsContainer}>
            {title === 'Breakfast' && <Text style={styles.mealItemSpecific}>Spinach Feta Quiche</Text>}
            {title === 'Lunch' && <Text style={styles.mealItemSpecific}>Sandwich Ingredients</Text>}
            {title === 'Dinner' && <Text style={styles.mealItemSpecific}>Pasta Night</Text>}
            
            {items.map((item: {id: string; title: string; description: string}, index: number) => (
              <View key={index} style={styles.mealItemRow}>
                <View style={styles.itemImagePlaceholder} />
                <View style={styles.mealItemDetails}>
                  <Text style={styles.mealItemDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      <Text style={styles.expandIcon}>{isActive ? '∧' : '∨'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealTab: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTabContent: {
    flex: 1,
  },
  mealTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealItemsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  mealItemSpecific: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealItemRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
  },
  mealItemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  mealItemDescription: {
    fontSize: 12,
    color: '#333',
  },
});

export default MealTab;