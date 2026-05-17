# 지도 모듈 (Map Module)

## 📋 개요

카카오 지도 API를 통합한 지도 기능 모듈입니다.

## 📁 파일 구조

```
src/map/
├── kakao-map.js    # 카카오 지도 클래스
├── map.css         # 지도 스타일 (예정)
└── README.md       # 이 파일
```

## 🗺️ 주요 기능

### 지도 기본 기능
- ✅ 지도 초기화 및 표시
- ✅ 마커 추가/삭제
- ✅ 정보 창 (InfoWindow)
- ✅ 줌 레벨 조절
- ✅ 지도 중심 변경

### 고급 기능
- 길찾기 (방향 안내)
- 근처 검색
- 지도 스냅샷 캡처
- 마커 커스터마이징

## 🚀 사용 방법

### 초기화

```javascript
const mapService = new KakaoMapService('map-container', 'YOUR_KAKAO_API_KEY');
await mapService.init();
```

### 마커 추가

```javascript
// 기본 마커
mapService.addMarker(37.4979, 127.0276, '강남역');

// 커스텀 이미지 마커
mapService.addMarker(
  37.4979, 127.0276, 
  '강남역', 
  'https://example.com/marker.png'
);
```

### 정보 창 표시

```javascript
mapService.showInfoWindow(0, '<div>강남역<br/>서울 서초구</div>');
```

### 지도 조절

```javascript
// 지도 중심 변경
mapService.setCenter(37.5665, 126.9780);

// 줌 레벨 설정 (1-14)
mapService.setZoomLevel(5);

// 마커 보이기/숨기기
mapService.setMarkersVisible(true);
```

### 길찾기

```javascript
const directions = await mapService.getDirections(
  37.4979, 127.0276,  // 강남역
  37.5665, 126.9780   // 서울시청
);
console.log(directions);
```

### 근처 검색

```javascript
const results = await mapService.searchNearby(
  '카페',           // 검색어
  37.4979, 127.0276, // 검색 중심 (강남역)
  1000              // 검색 반경 (1km)
);
console.log(results);
```

## 📍 주요 좌표

| 장소 | 위도 | 경도 |
|------|------|------|
| 강남역 | 37.4979 | 127.0276 |
| 서울시청 | 37.5665 | 126.9780 |
| 동대문역 | 37.4847 | 127.0986 |
| 명동 | 37.5640 | 126.9833 |

## 🔑 API 설정

### Kakao API Key 발급

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 애플리케이션 생성
3. Maps API 활성화
4. API Key 복사

### 환경 변수 설정

```env
# .env
KAKAO_MAP_API_KEY=your_api_key_here
```

## 📡 API 명세

### 길찾기 API

**요청:**
```
POST /api/map/directions
Content-Type: application/json

{
  "start": { "lat": 37.4979, "lng": 127.0276 },
  "end": { "lat": 37.5665, "lng": 126.9780 }
}
```

**응답:**
```json
{
  "distance": 5420,
  "duration": 720,
  "routes": [
    {
      "path": [...],
      "steps": [...]
    }
  ]
}
```

### 근처 검색 API

**요청:**
```
POST /api/map/search
Content-Type: application/json

{
  "keyword": "카페",
  "center": { "lat": 37.4979, "lng": 127.0276 },
  "radius": 1000
}
```

**응답:**
```json
{
  "places": [
    {
      "id": 1,
      "name": "더로드 커피",
      "lat": 37.4985,
      "lng": 127.0280,
      "address": "서울 강남구 ...",
      "phone": "02-XXX-XXXX"
    }
  ]
}
```

## 🎨 커스터마이징

### 마커 색상

```javascript
const customMarker = new kakao.maps.MarkerImage(
  'https://example.com/marker-red.png',
  new kakao.maps.Size(32, 32)
);
```

### 지도 스타일

```javascript
const mapOptions = {
  center: new kakao.maps.LatLng(37.4979, 127.0276),
  level: 3,
  mapTypeControl: true,
  zoomControl: true,
  draggable: true,
  scrollwheel: true
};
```

## 📝 개선 예정 (TODO)

- [ ] 지도 스타일 커스터마이징 (map.css)
- [ ] 클러스터 마커
- [ ] 폴리라인 (경로 표시)
- [ ] 폴리곤 (영역 표시)
- [ ] 히트맵
- [ ] 거리 계산 기능
- [ ] 테스트 코드 작성

## 🔗 관련 문서

- [Kakao Maps API 문서](https://apis.map.kakao.com/)
- [상위 문서: README.md](../../README.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
