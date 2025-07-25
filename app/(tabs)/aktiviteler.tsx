import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const sabahOneriler = [
  { icon: '🍳', text: 'Sabah kahvaltısında ciğer yiyebilirsiniz.' },
  { icon: '☕', text: 'Gümrük Hanı’nda menengiç kahvesi içebilirsiniz.' },
  { icon: '🌄', text: 'Sabah Balıklıgöl çevresinde yürüyüş yapabilirsiniz.' },
  { icon: '🕌', text: 'Hz. İbrahim’in doğduğu mağarayı ziyaret edebilirsiniz.' },
];

const ogleOneriler = [
  { icon: '🏛️', text: 'Bir konakta kahve içip öğle yemeğinizi yiyebilirsiniz.' },
  { icon: '🍽️', text: 'Urfa Kebabı ve ayran ile yöresel bir öğle yemeği yiyin.' },
  { icon: '🧿', text: 'Şanlıurfa Arkeoloji Müzesi’ni gezebilirsiniz.' },
  { icon: '☀️', text: 'Gümrük Hanı’nda serin bir mola verebilirsiniz.' },
];

const aksamOneriler = [
  { icon: '🐟', text: 'Akşama doğru Balıklıgöl turu yapabilirsiniz.' },
  { icon: '🎶', text: 'Bir sıra gecesi etkinliğine katılabilirsiniz.' },
  { icon: '🌆', text: 'Kale eteğinde gün batımını izleyebilirsiniz.' },
  { icon: '⛵', text: 'Halfeti’ye gidip tekne turu yaparak nehrin yanında serin bir mangal keyfi yapabilirsin.' },
];

function rastgeleOneri(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Aktiviteler() {
  const [sabah, setSabah] = useState(rastgeleOneri(sabahOneriler));
  const [ogle, setOgle] = useState(rastgeleOneri(ogleOneriler));
  const [aksam, setAksam] = useState(rastgeleOneri(aksamOneriler));

  const yenile = () => {
    setSabah(rastgeleOneri(sabahOneriler));
    setOgle(rastgeleOneri(ogleOneriler));
    setAksam(rastgeleOneri(aksamOneriler));
  };

  // Hava durumu kutusu için sabit veri
  const havaDurumu = {
    durum: 'Güneşli',
    derece:38,
  };
  let mesaj = '';
  if (havaDurumu.durum === 'Güneşli' && havaDurumu.derece < 40) {
    mesaj = 'Güneşli ve güzel bir hava var, tam gezmelik!';
  } else if (havaDurumu.derece >= 40) {
    mesaj = 'Bugün aşırı sıcak, kapalı alanları tercih edebilirsiniz.';
  } else {
    mesaj = 'Bugün hava durumu: ' + havaDurumu.durum;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktivite Önerileri</Text>
      <TouchableOpacity style={styles.refreshBtn} onPress={yenile}>
        <Text style={styles.refreshBtnText}>🔄 Yenile</Text>
      </TouchableOpacity>
      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sabah</Text>
          <Text style={styles.cardIcon}>{sabah.icon}</Text>
          <Text style={styles.cardText}>{sabah.text}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Öğle</Text>
          <Text style={styles.cardIcon}>{ogle.icon}</Text>
          <Text style={styles.cardText}>{ogle.text}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Akşam</Text>
          <Text style={styles.cardIcon}>{aksam.icon}</Text>
          <Text style={styles.cardText}>{aksam.text}</Text>
        </View>
      </View>
      {/* Hava durumu kutusu */}
      <View style={styles.weatherBox}>
        <Text style={styles.weatherTitle}>Bugün Şanlıurfa’da Hava</Text>
        <Text style={styles.weatherDegree}>{havaDurumu.durum}= {havaDurumu.derece}°C</Text>
        <Text style={styles.weatherMsg}>{mesaj}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f6f8fc',
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#b05e00',
  },
  refreshBtn: {
    backgroundColor: '#ffe4b5',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 22,
    marginBottom: 18,
    elevation: 2,
  },
  refreshBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b05e00',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    width: 120,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#b05e00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b05e00',
    marginBottom: 6,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  weatherBox: {
    backgroundColor: '#ffe4b5',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 18,
    width: '90%',
    alignSelf: 'center',
    elevation: 2,
  },
  weatherTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#b05e00',
    marginBottom: 6,
  },
  weatherDegree: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b05e00',
    marginBottom: 4,
  },
  weatherMsg: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
}); 