import React from 'react';
import { Text, View } from 'react-native';

export default function TarihiYerler() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Tarihi Yerler</Text>
      <Text>Yaklaştıkça bildirim ve sesli tarihçe anlatımı burada olacak.</Text>
    </View>
  );
} 