import React, { useState } from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const duraklar = [
  {
    id: '1',
    isim: 'Balıklıgöl Durağı',
    lat: 37.1591,
    lon: 38.7969,
    otobusler: [
      { numara: '63', rota: 'Balıklıgöl - Otogar' },
      { numara: '11', rota: 'Balıklıgöl - Karaköprü' },
    ],
  },
  {
    id: '2',
    isim: 'Otogar Durağı',
    lat: 37.1675,
    lon: 38.7950,
    otobusler: [
      { numara: '63', rota: 'Otogar - Balıklıgöl' },
      { numara: '21', rota: 'Otogar - Eyyübiye' },
    ],
  },
  {
    id: '3',
    isim: 'Karaköprü Durağı',
    lat: 37.1950,
    lon: 38.7960,
    otobusler: [
      { numara: '11', rota: 'Karaköprü - Balıklıgöl' },
      { numara: '27', rota: 'Karaköprü - Otogar' },
    ],
  },
];

const { width, height } = Dimensions.get('window');

export default function Ulasim() {
  const [selectedDurak, setSelectedDurak] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şanlıurfa Ulaşım Haritası</Text>
      {Platform.OS === 'web' ? (
        <View style={styles.webWarningBox}>
          <Text style={styles.webWarningText}>Mobilde haritayı görebilirsiniz.</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.1591,
            longitude: 38.7969,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
        >
          {duraklar.map((durak) => (
            <Marker
              key={durak.id}
              coordinate={{ latitude: durak.lat, longitude: durak.lon }}
              title={durak.isim}
              pinColor="#FFD600"
              onPress={() => setSelectedDurak(durak.id)}
            >
              <Callout tooltip>
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutTitle}>{durak.isim}</Text>
                  {durak.otobusler.map((otobus, i) => (
                    <Text key={i} style={styles.calloutText}>
                      🚌 {otobus.numara} - {otobus.rota}
                    </Text>
                  ))}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <View style={styles.listBox}>
        <Text style={styles.listTitle}>Otobüs Kalkış Noktaları</Text>
        <FlatList
          data={duraklar}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.durakCard}>
              <Text style={styles.durakIsim}>{item.isim}</Text>
              {item.otobusler.map((otobus, i) => (
                <Text key={i} style={styles.otobusBilgi}>🚌 {otobus.numara} - {otobus.rota}</Text>
              ))}
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBE7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43A047',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  map: {
    width: width,
    height: height * 0.38,
    borderRadius: 18,
    marginBottom: 10,
  },
  calloutBox: {
    backgroundColor: '#FFFDE7',
    borderRadius: 12,
    padding: 10,
    minWidth: 160,
    alignItems: 'center',
    borderColor: '#FFD600',
    borderWidth: 1,
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: '#43A047',
    marginBottom: 4,
    fontSize: 15,
  },
  calloutText: {
    color: '#333',
    fontSize: 14,
  },
  listBox: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: '#FFFDE7',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFD600',
    marginLeft: 12,
    marginBottom: 6,
  },
  durakCard: {
    backgroundColor: '#F9FBE7',
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
    minWidth: 140,
    elevation: 1,
    shadowColor: '#FFD600',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  durakIsim: {
    fontWeight: 'bold',
    color: '#43A047',
    fontSize: 15,
    marginBottom: 4,
  },
  otobusBilgi: {
    color: '#333',
    fontSize: 14,
  },
  webWarningBox: {
    backgroundColor: '#FFD600',
    borderRadius: 14,
    padding: 18,
    margin: 18,
    alignItems: 'center',
  },
  webWarningText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
}); 