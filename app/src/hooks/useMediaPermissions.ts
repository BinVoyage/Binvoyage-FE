import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

export default function useMediaPermissions() {
  const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
  const [galleryPermission, setGalleryPermission] = useState<PermissionStatus | null>(null);

  const checkCameraPermission = async () => {
    try {
      const status = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
      setCameraPermission(status);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const checkGalleryPermission = async () => {
    try {
      const status = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      setGalleryPermission(status);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const result = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
      setCameraPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting camera permission: ', error);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const result = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      setGalleryPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting gallery permission: ', error);
    }
  };

  useEffect(() => {
    checkCameraPermission();
    checkGalleryPermission();
  }, []);

  return {
    cameraPermission,
    galleryPermission,
    checkCameraPermission,
    checkGalleryPermission,
    requestCameraPermission,
    requestGalleryPermission,
  };
}
