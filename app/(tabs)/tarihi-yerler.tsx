import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mekanlar = [
  {
    id: '1',
    isim: 'Göbeklitepe',
    aciklama: 'Dünyanın bilinen en eski tapınak kompleksi. M.Ö. 9600-9500 yıllarına tarihlenir ve UNESCO Dünya Mirası Listesi’ndedir.',
    lat: 37.2231,
    lon: 38.9226,
    ikon: '🗿',
  },
  {
    id: '2',
    isim: 'Balıklıgöl',
    aciklama: 'Hz. İbrahim’in ateşe atıldığı ve ateşin suya, odunların balığa dönüştüğü rivayet edilen kutsal göl.',
    lat: 37.1591,
    lon: 38.7969,
    ikon: '🐟',
  },
  {
    id: '3',
    isim: 'Urfa Kalesi',
    aciklama: 'Şanlıurfa şehir merkezinde, tarihi Roma ve İslam dönemlerine uzanan kale.',
    lat: 37.1557,
    lon: 38.7926,
    ikon: '🏰',
  },
  {
    id: '4',
    isim: 'Hz. İbrahim Mağarası',
    aciklama: 'Hz. İbrahim’in doğduğuna inanılan kutsal mağara.',
    lat: 37.1593,
    lon: 38.7972,
    ikon: '🕳️',
  },
  {
    id: '5',
    isim: 'Rızvaniye Camii',
    aciklama: 'Balıklıgöl’ün yanında yer alan, 18. yüzyıldan kalma tarihi cami.',
    lat: 37.1592,
    lon: 38.7970,
    ikon: '🕌',
  },
];

function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // Dünya yarıçapı (metre)
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

export default function TarihiYerler() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [yakindakiMekan, setYakindakiMekan] = useState<typeof mekanlar[0] | null>(null);
  const [bildirimGonderildi, setBildirimGonderildi] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum izni verilmedi.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(loc.coords);
      // Bildirim izni iste
      await Notifications.requestPermissionsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    })();
  }, []);

  useEffect(() => {
    if (!location) return;
    let found = null;
    for (let mekan of mekanlar) {
      const mesafe = getDistanceFromLatLonInMeters(location.latitude, location.longitude, mekan.lat, mekan.lon);
      if (mesafe <= 20) {
        found = mekan;
        // Bildirim daha önce gönderilmediyse gönder
        if (bildirimGonderildi !== mekan.id) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: `${mekan.isim} Yakınındasınız!`,
              body: `Tarihini dinlemek için tıklayın.`,
              data: { mekanId: mekan.id },
            },
            trigger: null,
          });
          setBildirimGonderildi(mekan.id);
        }
        break;
      }
    }
    setYakindakiMekan(found);
    // Eğer yakın mekan yoksa bildirim gönderildi bilgisini sıfırla
    if (!found) setBildirimGonderildi(null);
  }, [location]);

  // Konumu belirli aralıklarla güncelle (her 10 saniye)
  useEffect(() => {
    let interval: any;
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        interval = setInterval(async () => {
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          setLocation(loc.coords);
        }, 10000);
      }
    })();
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Arka plan saydam Urfa temalı emoji */}
      <Text style={styles.bgIcon}>��</Text>
      <Text style={styles.bgIcon2}>🐟</Text>
      <Text style={styles.title}>Şanlıurfa'nın Tarihi Mekanları</Text>
      {yakindakiMekan && (
        <TouchableOpacity
          style={styles.yakinUyari}
          onPress={() => Speech.speak(`${yakindakiMekan.isim}: ${yakindakiMekan.aciklama}`, { language: 'tr-TR' })}
        >
          <Text style={styles.yakinUyariText}>Şu an {yakindakiMekan.isim}'e çok yakınsınız! Tarihini dinlemek için tıklayın.</Text>
        </TouchableOpacity>
      )}
      {errorMsg ? <Text style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</Text> : null}
      <FlatList
        data={mekanlar}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.ikon}>{item.ikon}</Text>
              <Text style={styles.mekanIsim}>{item.isim}</Text>
            </View>
            <Text style={styles.mekanAciklama}>{item.aciklama}</Text>
    </View>
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
  yakinUyari: {
    backgroundColor: '#FFD600',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  yakinUyariText: {
    color: '#43A047',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFDE7',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    zIndex: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ikon: {
    fontSize: 32,
    marginRight: 10,
  },
  mekanIsim: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD600',
    flex: 1,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mekanAciklama: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  bgIcon: {
    position: 'absolute',
    left: 10,
    top: 120,
    fontSize: 110,
    opacity: 0.07,
    zIndex: 0,
  },
  bgIcon2: {
    position: 'absolute',
    right: 10,
    top: 320,
    fontSize: 90,
    opacity: 0.07,
    zIndex: 0,
  },
}); 