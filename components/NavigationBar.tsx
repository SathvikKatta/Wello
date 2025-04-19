import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const NavigationBar: React.FC = () => {
  const router = useRouter(); // Make sure to define router here
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity 
        style={[styles.navItem, isActive('/home') && styles.activeNavItem]} 
        onPress={() => router.push('/home' as any)}
      >
        <View style={styles.navIcon} /> {/* Make sure navIcon is defined in styles */}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, isActive('/meal-planner') && styles.activeNavItem]} 
        onPress={() => router.push('/meal-planner' as any)}
      >
        <View style={styles.navIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, isActive('/profile') && styles.activeNavItem]} 
        onPress={() => router.push('/profile' as any)}
      >
        <View style={styles.navIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, isActive('/calendar') && styles.activeNavItem]} 
        onPress={() => router.push('/calendar' as any)}
      >
        <View style={styles.navIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, isActive('/cart') && styles.activeNavItem]} 
        onPress={() => router.push('/cart' as any)}
      >
        <View style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
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
  }
});

export default NavigationBar;