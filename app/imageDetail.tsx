import {  Pressable, StyleSheet, Vibration, Alert } from 'react-native';
import { useSearchParams } from "expo-router";
import { Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { downloadFile} from '../lib/ImageManager'
import * as MediaLibrary from 'expo-media-library';


export default function ModalScreen() {
  const { image, likes, user, description, id } = useSearchParams();
  let uri = decodeURIComponent(image as string)

  const handleDownload = async (id: string, uri: string) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (! permission.granted) return;
    downloadFile(id as string, uri);
    Vibration.vibrate();
    showAlert();
  }

  const showAlert = () => {
    Alert.alert("Image saved!")
  }
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.title}>
        {user}
      </Text>
      <Text>
        ❤️{likes}
      </Text>
      <Text>
        {description}
      </Text>
      <Pressable onPress={()=> handleDownload(id as string, uri)} style={styles.download}>
        <Text style={{color: "white"}}>
          Download
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    height: 400
  },
  download: {
    backgroundColor: "#1f2937",
    borderRadius: 50,
    margin: 10,
    padding: 10
  }
});
