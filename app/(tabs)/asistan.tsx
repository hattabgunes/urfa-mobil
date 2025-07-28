import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, FlatList as FlatListType, Image, KeyboardAvoidingView, ListRenderItem, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const COLORS = {
  user: '#FFD600', // Sarı
  assistant: '#43A047', // Yeşil
  background: '#F9FBE7',
  inputBg: '#FFFDE7',
  border: '#C5E1A5',
  sendBtn: '#FFD600',
};

const dummyAnswers = [
  'Şanlıurfa, Balıklıgöl ile ünlüdür.',
  'Urfa mutfağı kebaplarıyla meşhurdur.',
  'Göbeklitepe, dünyanın en eski tapınaklarından biridir ve Urfa’dadır.',
  'Urfa’da her yıl sıra geceleri düzenlenir.',
  'Daha fazla bilgi için tekrar sorabilirsiniz!'
];

export default function Asistan() {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'Merhaba! Şanlıurfa hakkında ne öğrenmek istersiniz?' }
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatListType<any>>(null);

  // Dummy cevaplar yerine anahtar kelimeye göre cevap fonksiyonu
  function getUrfaAnswer(message: string) {
    const msg = message.toLowerCase();
    // Göbeklitepe
    if (msg.includes('göbeklitepe')) {
      if (msg.includes('tarih')) {
        return 'Göbeklitepe, M.Ö. 9600-9500 yıllarına tarihlenen ve dünyanın bilinen en eski tapınak kompleksi olarak kabul edilen bir arkeolojik alanıdır. 2018 yılında UNESCO Dünya Mirası Listesi’ne alınmıştır ve insanlık tarihinin en eski ibadet merkezi olarak büyük öneme sahiptir.';
      }
      if (msg.includes('konum')) {
        return 'Göbeklitepe’nin konumunu Urfa Mobil haritalardan bakabilirsiniz.';
      }
      return 'Göbeklitepe, dünyanın en eski tapınaklarından biridir ve Şanlıurfa’dadır.';
    }
    // Urfa Kalesi
    if (msg.includes('urfa kalesi') || msg.includes('şanlıurfa kalesi')) {
      if (msg.includes('tarih')) {
        return 'Urfa Kalesi, milattan önce 2. yüzyıla kadar uzanan bir geçmişe sahiptir. Kale, Roma, Bizans ve İslam dönemlerinde çeşitli eklemelerle bugünkü halini almıştır. Şanlıurfa şehir merkezinin güneyinde, yüksek bir tepe üzerinde yer alır.';
      }
      if (msg.includes('konum')) {
        return 'Urfa Kalesi’nin konumunu Urfa Mobil haritalardan bakabilirsiniz.';
      }
      return 'Urfa Kalesi, Şanlıurfa şehir merkezinde tarihi bir yapıdır ve şehrin simgelerindendir.';
    }
    // Balıklıgöl
    if (msg.includes('balıklıgöl') || msg.includes('balıklı göl')) {
      if (msg.includes('tarih')) {
        return 'Balıklıgöl, İslam inancına göre Hz. İbrahim’in ateşe atıldığı ve ateşin suya, odunların ise balığa dönüştüğü yer olarak bilinir. Şanlıurfa’nın en önemli ve kutsal mekanlarından biridir.';
      }
      if (msg.includes('konum')) {
        return 'Balıklıgöl’ün konumunu Urfa Mobil haritalardan bakabilirsin.';
      }
      return 'Balıklıgöl, Şanlıurfa’nın en ünlü ve kutsal mekanlarından biridir.';
    }
    // Merhaba veya selam
    if (msg.includes('merhaba') || msg.includes('selam')) {
      return 'Merhaba! Size nasıl yardımcı olabilirim? 🙂';
    }
    // Genel cevap
    return 'Sadece Şanlıurfa ile ilgili soruları cevaplayabilirim.';
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTimeout(() => {
      const answer = getUrfaAnswer(userMessage.text);
      setMessages(prev => [...prev, { from: 'assistant', text: answer }]);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 700);
  };

  const handleClear = () => {
    setMessages([
      { from: 'assistant', text: 'Merhaba! Şanlıurfa hakkında ne öğrenmek istersiniz?' }
    ]);
  };

  const renderItem: ListRenderItem<{ from: string; text: string }> = ({ item }) => (
    <View style={[styles.bubble, item.from === 'user' ? styles.userBubble : styles.assistantBubble]}>
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  const { width, height } = Dimensions.get('window');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Urfa Mobil Asistan</Text>
      </View>
      <View style={styles.backgroundImageWrapper} pointerEvents="none">
        <Image
          source={require('../../assets/images/biber.jpg')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Şanlıurfa hakkında bir soru sorun..."
          placeholderTextColor="#A5A5A5"
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Temizle</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.user,
    paddingTop: Platform.OS === 'ios' ? 36 : StatusBar.currentHeight || 16,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.assistant,
    zIndex: 10,
    flexDirection: 'row',
  },
  headerText: {
    color: COLORS.assistant,
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  backgroundImageWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  backgroundImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.5,
    opacity: 0.13,
  },
  chatArea: {
    padding: 16,
    paddingBottom: 8,
    zIndex: 1,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.user,
    borderTopRightRadius: 4,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.assistant,
    borderTopLeftRadius: 4,
  },
  bubbleText: {
    color: '#222',
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18, // Yazı yazma alanını biraz yukarıya almak için
    zIndex: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: {
    backgroundColor: COLORS.sendBtn,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  clearBtn: {
    backgroundColor: COLORS.assistant,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginLeft: 6,
  },
}); 