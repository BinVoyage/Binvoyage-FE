declare namespace kakao.maps {
    class LatLng {
      constructor(latitude: number, longitude: number);
      getLat(): number;
      getLng(): number;
    }
  
    class Map {
      constructor(container: HTMLElement, options: object);
      getCenter(): LatLng;
      setCenter(position: LatLng): void;
      getLevel(): number;
      setLevel(level: number): void;
    }
  
    class Marker {
      constructor(options: {
        position: LatLng;
        map?: Map | null;
        image?: MarkerImage;
        title?: string;
        clickable?: boolean;
        zIndex?: number;
        opacity?: number;
    });
      setPosition(position: LatLng): void;
      setMap(map: Map | null): void;
      getImage(): MarkerImage | undefined;
      setImage(image: MarkerImage): void;
    }
  
    class Circle {
      constructor(options: object);
      setMap(map: Map | null): void;
    }
  
    class MarkerImage {
      constructor(src: string, size: Size, options?: {
          offset?: Point;
          alt?: string;
          shape?: string;
          coords?: string;
      });
  }
  
    class Size {
      constructor(width: number, height: number);
    }
  
    class Point {
      constructor(x: number, y: number);
    }
  
    class Polyline {
      constructor(options: object);
      getLength(): number;
    }
    
    namespace services {
      class Geocoder {
        coord2RegionCode(longitude: number, latitude: number, callback: (result: any[], status: any) => void): void;
      }
      
      const Status: {
        OK: any;
      };
    }
  }
  