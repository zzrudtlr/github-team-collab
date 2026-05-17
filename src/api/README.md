# API 서버 (API Server)

## 📋 개요

Express.js 기반의 REST API 서버입니다.

## 📁 파일 구조

```
src/api/
├── server.js       # API 서버 메인 파일
├── routes/         # 라우트 모듈 (예정)
├── controllers/    # 컨트롤러 (예정)
├── middleware/     # 미들웨어 (예정)
└── README.md       # 이 파일
```

## 🚀 설치 및 실행

### 의존성 설치

```bash
npm install express cors body-parser morgan
```

### 서버 실행

```bash
node src/api/server.js
```

또는

```bash
npm start
```

## 📡 API 엔드포인트

### 기본 정보

#### 헬스 체크
```
GET /health

응답:
{
  "status": "OK",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "environment": "development"
}
```

#### API 버전
```
GET /api/version

응답:
{
  "version": "1.0.0",
  "description": "Team Collaboration API Server",
  "timestamp": "2026-05-17T10:00:00.000Z"
}
```

### 인증 (Auth)

#### 로그인
```
POST /api/auth/login
Content-Type: application/json

요청:
{
  "email": "user@example.com",
  "password": "password123"
}

응답 (성공):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "role": "user"
  }
}

응답 (실패):
{
  "success": false,
  "message": "이메일 또는 비밀번호가 일치하지 않습니다."
}
```

**테스트 계정:**
- 이메일: `test@example.com`
- 비밀번호: `password123`

#### 회원가입
```
POST /api/auth/signup
Content-Type: application/json

요청:
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}

응답:
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "user": {
    "id": 123,
    "email": "newuser@example.com",
    "name": "New User",
    "role": "user"
  }
}
```

### 지도 (Map)

#### 길찾기
```
POST /api/map/directions
Content-Type: application/json

요청:
{
  "start": { "lat": 37.4979, "lng": 127.0276 },
  "end": { "lat": 37.5665, "lng": 126.9780 }
}

응답:
{
  "success": true,
  "distance": 5420,
  "duration": 720,
  "routes": [
    {
      "path": [...],
      "steps": [
        { "instruction": "북쪽으로 출발", "distance": 500 },
        { "instruction": "우회전", "distance": 3000 },
        { "instruction": "좌회전", "distance": 1920 }
      ]
    }
  ]
}
```

#### 근처 검색
```
POST /api/map/search
Content-Type: application/json

요청:
{
  "keyword": "카페",
  "center": { "lat": 37.4979, "lng": 127.0276 },
  "radius": 1000
}

응답:
{
  "success": true,
  "places": [
    {
      "id": 1,
      "name": "더로드 커피",
      "lat": 37.4985,
      "lng": 127.0280,
      "address": "서울 강남구 테헤란로 123",
      "phone": "02-123-4567",
      "rating": 4.5,
      "distance": 250
    }
  ],
  "total": 3
}
```

### 주식 분석 (Analysis)

#### 주식 정보 조회
```
GET /api/analysis/stock/:symbol

응답:
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 150.25,
    "change": 2.15,
    "changePercent": 1.45,
    "marketCap": 2500000000000,
    "volume": 50000000,
    "52WeekHigh": 160.00,
    "52WeekLow": 120.00
  }
}
```

**지원 종목:**
- AAPL (Apple)
- GOOGL (Google)
- 005930 (Samsung Electronics)

#### 기술 지표 조회
```
POST /api/analysis/indicators
Content-Type: application/json

요청:
{
  "symbol": "AAPL",
  "period": 20
}

응답:
{
  "success": true,
  "symbol": "AAPL",
  "indicators": {
    "ma": [
      { "date": "2026-05-15", "value": 101.5 },
      { "date": "2026-05-16", "value": 102.0 },
      { "date": "2026-05-17", "value": 101.8 }
    ],
    "rsi": [...],
    "macd": [...]
  }
}
```

## 🔧 환경 변수

```env
# API 포트 (기본값: 3000)
API_PORT=3000

# 환경 (development, production)
NODE_ENV=development
```

## 📊 미들웨어

### 1. CORS
- 크로스 오리진 요청 허용

### 2. Morgan
- HTTP 요청 로깅

### 3. Body Parser
- JSON 요청 본문 파싱

## 🧪 테스트

### cURL 테스트

```bash
# 헬스 체크
curl http://localhost:3000/health

# 로그인
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 길찾기
curl -X POST http://localhost:3000/api/map/directions \
  -H "Content-Type: application/json" \
  -d '{"start":{"lat":37.4979,"lng":127.0276},"end":{"lat":37.5665,"lng":126.9780}}'

# 주식 정보
curl http://localhost:3000/api/analysis/stock/AAPL
```

## 📝 개선 예정 (TODO)

- [ ] 데이터베이스 연동 (MongoDB, PostgreSQL)
- [ ] JWT 토큰 인증
- [ ] 요청 검증 (Joi, Yup)
- [ ] 캐싱 (Redis)
- [ ] API 버전 관리
- [ ] Swagger 문서 생성
- [ ] 단위 테스트 (Jest)
- [ ] 로깅 시스템 (Winston)
- [ ] 에러 핸들링 개선
- [ ] Rate Limiting

## 🔗 관련 문서

- [상위 문서: README.md](../../README.md)
- [GitHub Flow: github-flow.md](../../docs/github-flow.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
