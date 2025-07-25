import React from 'react';
import { Text, View } from 'react-native';

export default function Haberler() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Haberler</Text>
      <Text>Güncel yerel haberler ve duyurular burada olacak.</Text>
    </View>
  );
} 