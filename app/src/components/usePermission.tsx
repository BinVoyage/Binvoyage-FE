import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const usePermissions = async () => {
  try {
    const cameraStatus = await check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA);
    const galleryStatus = await check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (cameraStatus !== RESULTS.GRANTED) {
      await requestCameraPermission();
    }

    if (galleryStatus !== RESULTS.GRANTED) {
      await requestAlbumPermission();
    }
  } catch (err) {
    console.log(err);
  }
};

const requestCameraPermission = async () => {
  try {
    const result = await request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA);
  } catch (error) {
    console.error('Error requesting camera permission: ', error);
  }
};

const requestAlbumPermission = async () => {
  try {
    const result = await request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY);
  } catch (error) {
    console.error('Error requesting gallery permission: ', error);
  }
};
