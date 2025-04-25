import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons, Feather } from '@expo/vector-icons';

const avatarImage = require('../assets/images/Intersect.png');

const loadFonts = async () => {
  await Font.loadAsync({
    'Manjari-Bold': require('../assets/fonts/Manjari-Bold.ttf'),
  });
};

export default function ProfileScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Load fonts when the component mounts
  useEffect(() => {
    const loadAndSetFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    
    loadAndSetFonts();
  }, []);

  // Display a loading state while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      <Image source={avatarImage} style={styles.avatar} />

      <View style={styles.iconRow}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="image-outline" size={30} />
        </TouchableOpacity>
      </View>

      <ProfileButton label="Edit Profile" icon={<Ionicons name="person-outline" size={20} />} color="#D0A17E" textColor="#FFFFFF" />
      <ProfileButton label="Edit Medical History" icon={<Ionicons name="medical-outline" size={22} />} color="#FAD4D8" textColor="#912F40" />
      <ProfileButton label="Privacy & Security" icon={<Ionicons name="lock-closed" size={18} />} color="#B4CEB3" textColor="#2C5E3A" />
      <ProfileButton label="Bookmarks" icon={<Ionicons name="bookmark-outline" size={20} />} color="#9CCEDF" textColor="#1D4F6E" />
      <ProfileButton label="Billing & Payment" icon={<Ionicons name="card-outline" size={20} />} color="#FDC48C" textColor="#6E3E10" />
      <ProfileButton label="Settings" icon={<Feather name="settings" size={20} />} color="#DADADA" textColor="#333333" />
    </ScrollView>
  );
}

type ProfileButtonProps = {
  label: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
};

const ProfileButton = ({ label, icon, color, textColor }: ProfileButtonProps) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
    <Text style={[{ color: textColor }, styles.buttonText]}>{label}</Text>
    <View>{icon}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFF4EC',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 50,
    marginBottom: 20,
  },
  button: {
    width: '90%',
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Manjari-Bold', // Updated to use the loaded font
  },
});