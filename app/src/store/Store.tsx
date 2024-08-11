import WebView from 'react-native-webview';
import {create} from 'zustand';

type userStore = {
  webViewRef: React.RefObject<WebView> | null;
  setWebViewRef: (ref: React.RefObject<WebView>) => void;
  addressList?: String[];
  setAddressList: (list: String[]) => void;
};

export const mapStore = create<userStore>(set => ({
  webViewRef: null,
  setWebViewRef: (ref: React.RefObject<WebView>) => set({webViewRef: ref}),
  setAddressList: (list: String[]) => set({addressList: list}),
}));

type Image = {
  path: string;
  modificationDate: string;
};

type Picturestore = {
  images: Image[];
  addImages: (newImage: Image) => void;
};
export const pictureStore = create<Picturestore>(set => ({
  images: [],
  addImages: (newImage: Image) =>
    set(state => ({
      images: [...state.images, newImage],
    })),
}));
