import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const NavigationBar: React.FC = () => {
  const router = useRouter();
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
        <Image 
          source={require('../assets/images/homeWhite.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, isActive('/tplate') && styles.activeNavItem]}
        onPress={() => router.push('/tplate' as any)}
      >
        <Image 
          source={require('../assets/images/forkWhite.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, isActive('/profile') && styles.activeNavItem]}
        onPress={() => router.push('/profile' as any)}
      >
        <Image 
          source={require('../assets/images/profileWhite.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, isActive('/barcode') && styles.activeNavItem]}
        onPress={() => router.push('/barcode' as any)}
      >
        <Image 
          source={require('../assets/images/barcodeWhite.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, isActive('/cart') && styles.activeNavItem]}
        onPress={() => router.push('/cart' as any)}
      >
        <Image 
          source={require('../assets/images/cartWhite.png')} 
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#c8a286', // Brown color from your reference image
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
    // Optional: You might want to adjust how active items are styled
  },
  navIcon: {
    width: 24,
    height: 24,
  }
});

export default NavigationBar;