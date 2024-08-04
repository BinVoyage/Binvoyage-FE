declare namespace kakao.maps {
    class LatLng {
      constructor(latitude: number, longitude: number);
    }
  
    class Map {
      constructor(container: HTMLElement, options: object);
      setCenter(position: LatLng): void;
      getLevel(): number;
      setLevel(level: number): void;
    }
  
    class Marker {
      constructor(options: object);
      setPosition(position: LatLng): void;
      setMap(map: Map | null): void;
    }
  
    class Circle {
      constructor(options: object);
      setMap(map: Map | null): void;
    }
  
    class MarkerImage {
      constructor(src: string, size: object, options?: object);
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
  