import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  main: '#FFD600', // Sarı
  accent: '#43A047', // Yeşil
  background: '#F9FBE7',
  card: '#FFFDE7',
  text: '#222',
  subText: '#666',
};

const { width, height } = Dimensions.get('window');

// Dummy hava durumu verisi
const weather = {
  city: 'Şanlıurfa',
  date: new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }),
  icon: 'https://openweathermap.org/img/wn/01d@4x.png', // Güneşli örnek ikon
  temp: 32,
  feels_like: 34,
  humidity: 28,
  wind: 12,
  desc: 'Açık',
};

function getAdvice(temp: number) {
  if (temp < 0 && temp >= -5) return 'Çok soğuk, sıkı giyin!';
  if (temp >= 0 && temp < 15) return 'Soğuk, dikkatli giyin.';
  if (temp >= 15 && temp < 35) return 'Hava güzel, keyfini çıkar!';
  if (temp >= 35 && temp < 40) return 'Hava sıcak, bol su içmeyi unutma!';
  if (temp >= 40 && temp <= 60) return 'Hava çok sıcak, dışarı çıkmak riskli!';
  return '';
}

export default function Hava() {
  return (
    <View style={styles.container}>
      {/* Arka plan ikonları */}
      <View style={styles.bgIconCloud}><Text style={styles.bgIconText}>☁️</Text></View>
      <View style={styles.bgIconSun}><Text style={styles.bgIconText}>☀️</Text></View>
      <View style={styles.card}>
        <Text style={styles.city}>{weather.city}</Text>
        <Text style={styles.date}>{weather.date}</Text>
        <Image source={{ uri: weather.icon }} style={styles.icon} />
        <Text style={styles.temp}>{weather.temp}°C</Text>
        <Text style={styles.desc}>{weather.desc}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Hissedilen</Text>
            <Text style={styles.detailValue}>{weather.feels_like}°C</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Nem</Text>
            <Text style={styles.detailValue}>%{weather.humidity}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Rüzgar</Text>
            <Text style={styles.detailValue}>{weather.wind} km/s</Text>
          </View>
        </View>
      </View>
      <View style={styles.adviceBox}>
        <Text style={styles.adviceText}>{getAdvice(weather.temp)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  bgIconCloud: {
    position: 'absolute',
    left: width * 0.05,
    top: height * 0.18,
    opacity: 0.13,
    zIndex: 0,
  },
  bgIconSun: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.05,
    opacity: 0.13,
    zIndex: 0,
  },
  bgIconText: {
    fontSize: width * 0.38,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 18,
    width: 320,
    maxWidth: '100%',
    zIndex: 1,
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 2,
  },
  date: {
    fontSize: 16,
    color: COLORS.subText,
    marginBottom: 8,
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.main,
    marginVertical: 2,
  },
  desc: {
    fontSize: 20,
    color: COLORS.accent,
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  detailBox: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.subText,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  adviceBox: {
    backgroundColor: COLORS.main,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: 320,
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 1,
  },
  adviceText: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 