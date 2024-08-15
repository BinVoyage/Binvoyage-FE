import api from 'api/api';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {pictureStore} from 'store/Store';

export const useImage = () => {
  const addImages = pictureStore(state => state.addImages);
  const [urls, setUrl] = useState<any>();
  const Camera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
      });
      console.log('camera', image);
      if (image) {
        addImages({
          data: image,
          path: image.path,
          modificationDate: image.modificationDate!,
        });
      }
      // if (image) {
      //   addImages({
      //     path: image.path,
      //     modificationDate: image.modificationDate!,
      //     data: image.sourceURL!,
      //   });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const Album = async () => {
    try {
      const imageList = await ImagePicker.openPicker({
        multiple: true,
        cropping: false,
        mediaType: 'photo',
      });

      for (const image of imageList) {
        try {
          const cropped = await ImagePicker.openCropper({
            path: image.path,
            width: 300,
            height: 300,
            mediaType: 'photo',
          });
          if (cropped) {
            addImages({
              path: cropped.path,
              modificationDate: cropped.modificationDate!,
              data: image.filename!,
            });
          }
        } catch (cropError) {
          console.error('Error cropping image: ', cropError);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = async () => {
    try {
      const url = await api.get('/image-url');
      console.log('이미지 성공', url.data.data);
      setUrl(url.data.data.presigned_url);
    } catch (error) {
      console.log(error);
    }
  };

  // getImages();

  return {Camera, Album, getImages};
};
