import React from 'react';
import { Text, View } from 'react-native';

export default function Aktiviteler() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Aktiviteler</Text>
      <Text>Burada günlük aktiviteler olacak.</Text>
    </View>
  );
} 