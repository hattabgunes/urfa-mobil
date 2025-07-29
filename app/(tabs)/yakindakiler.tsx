import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const yerler = [
  {
    id: '1',
    isim: 'Göbeklitepe',
    aciklama: 'Dünyanın en eski tapınak kompleksi.',
    lat: 37.2231,
    lon: 38.9226,
    ikon: '🗿',
  },
  {
    id: '2',
    isim: 'Balıklıgöl',
    aciklama: 'Kutsal balıkların bulunduğu göl.',
    lat: 37.1591,
    lon: 38.7969,
    ikon: '🐟',
  },
  {
    id: '3',
    isim: 'Urfa Kalesi',
    aciklama: 'Şanlıurfa şehir merkezinde tarihi kale.',
    lat: 37.1557,
    lon: 38.7926,
    ikon: '🏰',
  },
  {
    id: '4',
    isim: 'Şanlıurfa Arkeoloji Müzesi',
    aciklama: 'Zengin arkeolojik koleksiyon.',
    lat: 37.1531,
    lon: 38.7966,
    ikon: '🏺',
  },
  {
    id: '5',
    isim: 'Halfeti',
    aciklama: 'Fırat Nehri kıyısında tarihi ilçe.',
    lat: 37.2422,
    lon: 37.8686,
    ikon: '⛵',
  },
  {
    id: '6',
    isim: 'Rızvaniye Camii',
    aciklama: 'Balıklıgöl yanında tarihi cami.',
    lat: 37.1592,
    lon: 38.7970,
    ikon: '🕌',
  },
];

function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(metre: number) {
  if (metre < 1000) return `${Math.round(metre)} m`;
  return `${(metre / 1000).toFixed(2)} km`;
}

export default function Yakindakiler() {
  const [konum, setKonum] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [mesafeler, setMesafeler] = useState<Array<typeof yerler[0] & { mesafe: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni verilmedi.');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setKonum(loc.coords);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!konum) return;
    const yeniMesafeler = yerler.map(y => ({
      ...y,
      mesafe: getDistanceFromLatLonInMeters(konum.latitude, konum.longitude, y.lat, y.lon),
    }));
    yeniMesafeler.sort((a, b) => a.mesafe - b.mesafe);
    setMesafeler(yeniMesafeler);
  }, [konum]);

  const handleNavigate = (lat: number, lon: number, isim: string) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lon}`,
      android: `http://maps.google.com/maps?daddr=${lat},${lon}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yakınındaki Önemli Yerler</Text>
      {loading && <ActivityIndicator size="large" color="#43A047" style={{ marginTop: 32 }} />}
      {errorMsg ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 24 }}>{errorMsg}</Text> : null}
      <FlatList
        data={mesafeler}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.lat, item.lon, item.isim)}>
            <View style={styles.cardHeader}>
              <Text style={styles.ikon}>{item.ikon}</Text>
              <Text style={styles.mekanIsim}>{item.isim}</Text>
              <Text style={styles.mesafe}>{formatDistance(item.mesafe)}</Text>
            </View>
            <Text style={styles.mekanAciklama}>{item.aciklama}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
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
    marginTop: Platform.OS === 'ios' ? 32 : 0,
  },
  card: {
    backgroundColor: '#FFFDE7',
    borderRadius: 22,
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
    marginRight: 10,
  },
  mekanIsim: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFD600',
    flex: 1,
  },
  mesafe: {
    fontSize: 15,
    color: '#43A047',
    fontWeight: 'bold',
  },
  mekanAciklama: {
    fontSize: 15,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 20,
  },
}); 