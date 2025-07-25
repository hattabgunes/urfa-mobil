import { Slot } from 'expo-router';
import React from 'react';
import MenuButton from './MenuButton';

export default function TabLayout() {
  return (
    <>
      <MenuButton />
      <Slot />
    </>
  );
}