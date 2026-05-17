/**
 * Kakao Map Module
 * 카카오 지도 통합 기능
 */

class KakaoMapService {
  constructor(containerId, apiKey) {
    this.containerId = containerId;
    this.apiKey = apiKey;
    this.map = null;
    this.markers = [];
    this.infoWindows = [];
  }

  /**
   * 지도 초기화
   */
  async init() {
    try {
      // Kakao Maps API 로드
      await this.loadKakaoMapsAPI();

      // 지도 생성
      const mapContainer = document.getElementById(this.containerId);
      const mapOptions = {
        center: new kakao.maps.LatLng(37.4979, 127.0276), // 서울 강남역
        level: 3,
        mapTypeControl: true,
        zoomControl: true
      };

      this.map = new kakao.maps.Map(mapContainer, mapOptions);
      console.log('Kakao Map 초기화 완료');
    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  }

  /**
   * Kakao Maps API 로드
   */
  loadKakaoMapsAPI() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${this.apiKey}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Kakao Maps API 로드 실패'));
      document.head.appendChild(script);
    });
  }

  /**
   * 마커 추가
   * @param {number} lat - 위도
   * @param {number} lng - 경도
   * @param {string} title - 마커 제목
   * @param {string} imageUrl - 마커 이미지 URL (선택사항)
   */
  addMarker(lat, lng, title, imageUrl = null) {
    const position = new kakao.maps.LatLng(lat, lng);

    const markerOptions = {
      position: position,
      title: title
    };

    // 커스텀 이미지 마커
    if (imageUrl) {
      const imageSize = new kakao.maps.Size(32, 32);
      const markerImage = new kakao.maps.MarkerImage(imageUrl, imageSize);
      markerOptions.image = markerImage;
    }

    const marker = new kakao.maps.Marker(markerOptions);
    marker.setMap(this.map);

    this.markers.push({
      marker: marker,
      lat: lat,
      lng: lng,
      title: title
    });

    console.log(`마커 추가: ${title} (${lat}, ${lng})`);
    return marker;
  }

  /**
   * 정보 창 표시
   * @param {number} markerIndex - 마커 인덱스
   * @param {string} content - 정보 창 내용
   */
  showInfoWindow(markerIndex, content) {
    if (markerIndex >= this.markers.length) {
      console.error('유효하지 않은 마커 인덱스');
      return;
    }

    // 기존 정보 창 모두 닫기
    this.infoWindows.forEach(iw => iw.close());

    const marker = this.markers[markerIndex].marker;
    const infoWindow = new kakao.maps.InfoWindow({
      content: content,
      removable: true
    });

    infoWindow.open(this.map, marker);
    this.infoWindows.push(infoWindow);
  }

  /**
   * 지도 중심 변경
   * @param {number} lat - 위도
   * @param {number} lng - 경도
   */
  setCenter(lat, lng) {
    const moveLatLng = new kakao.maps.LatLng(lat, lng);
    this.map.setCenter(moveLatLng);
  }

  /**
   * 줌 레벨 설정
   * @param {number} level - 줌 레벨 (1-14)
   */
  setZoomLevel(level) {
    this.map.setLevel(level);
  }

  /**
   * 모든 마커 표시/숨기기
   * @param {boolean} visible - 표시 여부
   */
  setMarkersVisible(visible) {
    this.markers.forEach(({ marker }) => {
      marker.setVisible(visible);
    });
  }

  /**
   * 특정 마커 삭제
   * @param {number} index - 마커 인덱스
   */
  removeMarker(index) {
    if (index < 0 || index >= this.markers.length) {
      console.error('유효하지 않은 마커 인덱스');
      return;
    }

    this.markers[index].marker.setMap(null);
    this.markers.splice(index, 1);
  }

  /**
   * 모든 마커 삭제
   */
  clearMarkers() {
    this.markers.forEach(({ marker }) => marker.setMap(null));
    this.markers = [];
    this.infoWindows = [];
  }

  /**
   * 길찾기 (방향)
   * @param {number} startLat - 시작 위도
   * @param {number} startLng - 시작 경도
   * @param {number} endLat - 도착 위도
   * @param {number} endLng - 도착 경도
   */
  async getDirections(startLat, startLng, endLat, endLng) {
    try {
      const response = await fetch('/api/map/directions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start: { lat: startLat, lng: startLng },
          end: { lat: endLat, lng: endLng }
        })
      });

      const data = await response.json();
      console.log('길찾기 결과:', data);
      return data;
    } catch (error) {
      console.error('길찾기 실패:', error);
    }
  }

  /**
   * 근처 검색
   * @param {string} keyword - 검색어
   * @param {number} lat - 중심 위도
   * @param {number} lng - 중심 경도
   * @param {number} radius - 검색 반경 (미터)
   */
  async searchNearby(keyword, lat, lng, radius = 1000) {
    try {
      const response = await fetch('/api/map/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword,
          center: { lat: lat, lng: lng },
          radius: radius
        })
      });

      const data = await response.json();
      console.log('검색 결과:', data);

      // 검색 결과를 마커로 표시
      if (data.places) {
        data.places.forEach(place => {
          this.addMarker(place.lat, place.lng, place.name);
        });
      }

      return data;
    } catch (error) {
      console.error('검색 실패:', error);
    }
  }

  /**
   * 지도 스냅샷 저장
   */
  captureSnapshot() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      return canvas.toDataURL();
    }
    console.warn('지도 캔버스를 찾을 수 없습니다.');
    return null;
  }
}

// 사용 예시
/*
const mapService = new KakaoMapService('map-container', 'YOUR_KAKAO_API_KEY');
mapService.init();

// 마커 추가
mapService.addMarker(37.4979, 127.0276, '강남역');
mapService.addMarker(37.4847, 127.0986, '동대문역');

// 정보 창 표시
mapService.showInfoWindow(0, '<div>강남역<br/>서울 서초구</div>');

// 지도 중심 변경
mapService.setCenter(37.5665, 126.9780);
*/

module.exports = KakaoMapService;
