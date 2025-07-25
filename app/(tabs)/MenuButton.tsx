import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function MenuButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <TouchableOpacity style={styles.hamburgerButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.hamburgerText}>☰</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.quickLinksTitle}>Menü</Text>
            <View style={styles.quickLinksBox}>
              {quickLinks.map(link => (
                <TouchableOpacity
                  key={link.title}
                  style={styles.quickLinkCard}
                  onPress={() => {
                    setModalVisible(false);
                    router.push(link.route);
                  }}
                >
                  <Text style={styles.quickLinkIcon}>{link.icon}</Text>
                  <Text style={styles.quickLinkText}>{link.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
}); 