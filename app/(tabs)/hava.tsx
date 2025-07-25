import React from 'react';
import { Text, View } from 'react-native';

export default function Hava() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Hava</Text>
      <Text>Şehrin güncel ve haftalık hava durumu burada olacak.</Text>
    </View>
  );
} 