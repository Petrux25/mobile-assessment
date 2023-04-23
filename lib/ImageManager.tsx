import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const imageDir = FileSystem.cacheDirectory + 'images/';
const imageFileUri = (imageId: string) => imageDir + `image_${imageId}.png`;


export async function downloadFile(imageId: string, imageURI: string) {
  let fileUri = imageFileUri(imageId);
  FileSystem.downloadAsync(imageURI, fileUri)
    .then(({ uri }) => {
      saveFile(uri);
    })
    .catch(error => {
      console.error(error);
    })
  return
}

async function saveFile(fileUri: string) {
  await MediaLibrary.saveToLibraryAsync(fileUri);
}

