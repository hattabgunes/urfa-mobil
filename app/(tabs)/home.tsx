import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, Easing, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const quickLinks = [
  { title: 'Ana Sayfa', route: '/(tabs)/home', icon: '🏠' },
  { title: 'Aktiviteler', route: '/(tabs)/aktiviteler', icon: '🎉' },
  { title: 'Ulaşım', route: '/(tabs)/ulasim', icon: '🚌' },
  { title: 'Asistan', route: '/(tabs)/asistan', icon: '🤖' },
  { title: 'Tarihi Yerler', route: '/(tabs)/tarihi-yerler', icon: '🏛️' },
  { title: 'Yakındakiler', route: '/(tabs)/yakindakiler', icon: '📍' },
  { title: 'Hava', route: '/(tabs)/hava', icon: '☀️' },
  { title: 'Haberler', route: '/(tabs)/haberler', icon: '📰' },
];

const galleryImages = [
  require('../../assets/images/urfa-kale2.jpg'),
  require('../../assets/images/urfadan-kareler.jpg'),
  require('../../assets/images/urfadan-kareler2.jpg'),
  require('../../assets/images/urfadan-kareler3.jpg'),
  require('../../assets/images/urfadan-kareler4.jpg'),
  require('../../assets/images/urfadan-kareler5.jpg'),
];

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.bgWrap}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Üstte büyük Urfa Kalesi görseli */}
        <View style={styles.imageBox}>
          <Image source={require('../../assets/images/urfa-kale2.jpg')} style={styles.kaleImage} resizeMode="cover" />
        </View>
        {/* Hoş geldin kutusu ve şehir tanıtımı (degrade + animasyon) */}
        <Animated.View style={[styles.welcomeBox, { opacity: fadeAnim }]}> 
          <Text style={styles.title}>URFA MOBİL <Text style={styles.cityIcon}>🌆</Text></Text>
          <Text style={styles.subtitle}>Hoş geldiniz! Şanlıurfa’yı Keşfetmeye Hazır mısınız?</Text>
          <Text style={styles.intro}><Text style={styles.introIcon}>🕌</Text> Şanlıurfa’nın tarihi, kültürel ve doğal güzelliklerini kolayca keşfet, şehirdeki tüm olanaklara tek tıkla ulaş!</Text>
        </Animated.View>
        {/* Günün önerisi kutusu (kart gibi, renkli) */}
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionTitle}>🌟 Günün Önerisi</Text>
          <Text style={styles.suggestionDesc}>Balıklıgöl’ü ziyaret edin ve tarihi atmosferin tadını çıkarın!</Text>
        </View>
        {/* Alt kısımda yatay kaydırmalı galeri */}
        <Text style={styles.galleryTitle}>Şanlıurfa’dan Kareler</Text>
        <FlatList
          data={galleryImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          style={styles.galleryList}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <Image source={item} style={styles.galleryImage} resizeMode="cover" />
          )}
        />
      </ScrollView>
      {/* Arka plan degrade */}
      <View style={styles.bgGradient} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  bgWrap: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'transparent',
    // Hafif degrade için linear-gradient yerine fallback renkler
    backgroundImage: 'linear-gradient(135deg, #f6f8fc 60%, #ffe4b5 100%)',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    minHeight: '100%',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  hamburgerText: {
    fontSize: 28,
    color: '#444',
    fontWeight: 'bold',
  },
  imageBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 24,
    zIndex: 2,
  },
  kaleImage: {
    width: '92%',
    height: 210,
    borderRadius: 32,
    marginTop: 28,
    marginBottom: 0,
    borderWidth: 3,
    borderColor: '#ffe4b5',
    shadowColor: '#b05e00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  welcomeBox: {
    backgroundColor: 'linear-gradient(135deg, #fffbe6 60%, #ffe4b5 100%)',
    borderRadius: 22,
    padding: 20,
    marginTop: 0,
    marginBottom: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2a2a2a',
  },
  cityIcon: {
    fontSize: 22,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4a4a4a',
    textAlign: 'center',
  },
  intro: {
    fontSize: 15,
    color: '#666',
    marginBottom: 0,
    textAlign: 'center',
  },
  introIcon: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: 320,
    alignItems: 'center',
    elevation: 4,
  },
  quickLinksTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 10,
  },
  quickLinksBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  quickLinkCard: {
    backgroundColor: '#f6f8fc',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    margin: 6,
    alignItems: 'center',
    width: 90,
    elevation: 1,
  },
  quickLinkIcon: {
    fontSize: 26,
    marginBottom: 2,
  },
  quickLinkText: {
    fontSize: 13,
    color: '#4a4a4a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  suggestionBox: {
    backgroundColor: '#ffe4b5',
    padding: 22,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 32,
    width: '90%',
    maxWidth: 370,
    elevation: 3,
    shadowColor: '#b05e00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  suggestionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#b05e00',
  },
  suggestionDesc: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  galleryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginTop: 16,
    marginBottom: 12,
    alignSelf: 'flex-start',
    marginLeft: '6%',
  },
  galleryList: {
    marginBottom: 32,
  },
  galleryImage: {
    width: width * 0.38,
    height: 110,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#ffe4b5',
  },
}); 