import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="health-conditions" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="home" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="meal-planner" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="calendar" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="cart" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="medicine" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </>
  );
}