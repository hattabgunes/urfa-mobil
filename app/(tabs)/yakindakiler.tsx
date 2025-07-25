import React from 'react';
import { Text, View } from 'react-native';

export default function Yakindakiler() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Yakındaki Hizmetler</Text>
      <Text>Otel, eczane, taksi ve restoranlar burada listelenecek.</Text>
    </View>
  );
} 