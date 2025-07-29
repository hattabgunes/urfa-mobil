import React from 'react';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const haberler = [
  {
    id: '1',
    baslik: 'Göbeklitepe’de Yeni Kazı Çalışmaları Başladı',
    aciklama: 'Şanlıurfa’daki Göbeklitepe’de arkeologlar yeni bulgulara ulaştı.',
    tarih: '2024-05-01',
    url: 'https://www.urfaexample.com/haber/gobeklitepe-kazi',
    ikon: '🗿',
  },
  {
    id: '2',
    baslik: 'Balıklıgöl’de Ziyaretçi Rekoru',
    aciklama: 'Balıklıgöl, Ramazan Bayramı’nda binlerce ziyaretçiyi ağırladı.',
    tarih: '2024-04-15',
    url: 'https://www.urfaexample.com/haber/balikligol-rekor',
    ikon: '🐟',
  },
  {
    id: '3',
    baslik: 'Urfa Kalesi Restorasyonunda Son Durum',
    aciklama: 'Şanlıurfa Kalesi’nde devam eden restorasyon çalışmaları hız kazandı.',
    tarih: '2024-03-28',
    url: 'https://www.urfaexample.com/haber/urfa-kalesi-restorasyon',
    ikon: '🏰',
  },
  {
    id: '4',
    baslik: 'Şanlıurfa’da Sıra Gecesi Festivali',
    aciklama: 'Geleneksel sıra gecesi festivali renkli görüntülere sahne oldu.',
    tarih: '2024-03-10',
    url: 'https://www.urfaexample.com/haber/sira-gecesi-festivali',
    ikon: '🎶',
  },
];

export default function Haberler() {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şanlıurfa Haberleri</Text>
      <FlatList
        data={haberler}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.url)}>
            <View style={styles.cardHeader}>
              <Text style={styles.ikon}>{item.ikon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.baslik}>{item.baslik}</Text>
                <Text style={styles.tarih}>{item.tarih}</Text>
              </View>
            </View>
            <Text style={styles.aciklama}>{item.aciklama}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBE7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#43A047',
    marginBottom: 18,
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: '#FFFDE7',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ikon: {
    fontSize: 30,
    marginRight: 12,
  },
  baslik: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFD600',
  },
  tarih: {
    fontSize: 13,
    color: '#43A047',
    marginTop: 2,
  },
  aciklama: {
    fontSize: 15,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 20,
  },
}); 