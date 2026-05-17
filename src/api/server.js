/**
 * API Server
 * Express.js 기반 REST API 서버
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// 앱 생성
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 환경 변수
const PORT = process.env.API_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 헬스 체크 엔드포인트
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

/**
 * API 버전 정보
 */
app.get('/api/version', (req, res) => {
  res.json({
    version: '1.0.0',
    description: 'Team Collaboration API Server',
    timestamp: new Date().toISOString()
  });
});

/**
 * 인증 API
 */
const authRoutes = {
  login: '/api/auth/login',
  signup: '/api/auth/signup',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh'
};

// 로그인
app.post(authRoutes.login, (req, res) => {
  const { email, password } = req.body;

  // 유효성 검사
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: '이메일과 비밀번호를 입력해주세요.'
    });
  }

  // 임시 로그인 로직 (실제로는 DB 조회 필요)
  if (email === 'test@example.com' && password === 'password123') {
    res.json({
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        id: 1,
        email: email,
        name: 'Test User',
        role: 'user'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: '이메일 또는 비밀번호가 일치하지 않습니다.'
    });
  }
});

// 회원가입
app.post(authRoutes.signup, (req, res) => {
  const { email, password, name } = req.body;

  // 유효성 검사
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: '모든 필드를 입력해주세요.'
    });
  }

  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식이 아닙니다.'
    });
  }

  // 비밀번호 길이 검사
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: '비밀번호는 최소 8자 이상이어야 합니다.'
    });
  }

  // 임시 회원가입 로직
  res.status(201).json({
    success: true,
    message: '회원가입이 완료되었습니다.',
    user: {
      id: Math.floor(Math.random() * 10000),
      email: email,
      name: name,
      role: 'user'
    }
  });
});

/**
 * 지도 API
 */
const mapRoutes = {
  directions: '/api/map/directions',
  search: '/api/map/search'
};

// 길찾기
app.post(mapRoutes.directions, (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({
      success: false,
      message: '시작점과 도착점을 입력해주세요.'
    });
  }

  // 임시 길찾기 데이터
  res.json({
    success: true,
    distance: 5420,  // 미터
    duration: 720,   // 초
    routes: [
      {
        path: [start, end],
        steps: [
          { instruction: '북쪽으로 출발', distance: 500 },
          { instruction: '우회전', distance: 3000 },
          { instruction: '좌회전', distance: 1920 }
        ]
      }
    ]
  });
});

// 근처 검색
app.post(mapRoutes.search, (req, res) => {
  const { keyword, center, radius } = req.body;

  if (!keyword || !center) {
    return res.status(400).json({
      success: false,
      message: '검색어와 위치를 입력해주세요.'
    });
  }

  // 임시 검색 결과
  res.json({
    success: true,
    places: [
      {
        id: 1,
        name: '더로드 커피',
        lat: center.lat + 0.0006,
        lng: center.lng + 0.0004,
        address: '서울 강남구 테헤란로 123',
        phone: '02-123-4567',
        rating: 4.5,
        distance: 250
      },
      {
        id: 2,
        name: '스타벅스 강남점',
        lat: center.lat - 0.0003,
        lng: center.lng + 0.0005,
        address: '서울 강남구 강남대로 456',
        phone: '02-234-5678',
        rating: 4.2,
        distance: 380
      },
      {
        id: 3,
        name: '커피빈 역삼점',
        lat: center.lat + 0.0002,
        lng: center.lng - 0.0006,
        address: '서울 강남구 역삼로 789',
        phone: '02-345-6789',
        rating: 4.3,
        distance: 420
      }
    ],
    total: 3
  });
});

/**
 * 주식 분석 API
 */
const analysisRoutes = {
  stock: '/api/analysis/stock/:symbol',
  indicators: '/api/analysis/indicators',
  performance: '/api/analysis/performance'
};

// 주식 정보 조회
app.get(analysisRoutes.stock, (req, res) => {
  const { symbol } = req.params;

  // 임시 주식 정보
  const stocks = {
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 150.25,
      change: 2.15,
      changePercent: 1.45,
      marketCap: 2500000000000,
      volume: 50000000,
      '52WeekHigh': 160.00,
      '52WeekLow': 120.00
    },
    'GOOGL': {
      symbol: 'GOOGL',
      name: 'Google LLC',
      price: 140.50,
      change: -1.25,
      changePercent: -0.88,
      marketCap: 1400000000000,
      volume: 30000000,
      '52WeekHigh': 155.00,
      '52WeekLow': 100.00
    },
    '005930': {
      symbol: '005930',
      name: 'Samsung Electronics',
      price: 70000,
      change: 500,
      changePercent: 0.72,
      marketCap: 410000000000000,
      volume: 10000000,
      '52WeekHigh': 80000,
      '52WeekLow': 55000
    }
  };

  if (stocks[symbol]) {
    res.json({
      success: true,
      data: stocks[symbol]
    });
  } else {
    res.status(404).json({
      success: false,
      message: '찾을 수 없는 종목입니다.'
    });
  }
});

// 기술 지표 조회
app.post(analysisRoutes.indicators, (req, res) => {
  const { symbol, period } = req.body;

  res.json({
    success: true,
    symbol: symbol,
    indicators: {
      ma: [
        { date: '2026-05-15', value: 101.5 },
        { date: '2026-05-16', value: 102.0 },
        { date: '2026-05-17', value: 101.8 }
      ],
      rsi: [
        { date: '2026-05-15', value: 45.2 },
        { date: '2026-05-16', value: 52.8 },
        { date: '2026-05-17', value: 58.5 }
      ],
      macd: [
        { date: '2026-05-15', value: 0.85 },
        { date: '2026-05-16', value: 0.92 },
        { date: '2026-05-17', value: 0.78 }
      ]
    }
  });
});

/**
 * 에러 핸들링
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '찾을 수 없는 엔드포인트입니다.',
    path: req.path
  });
});

/**
 * 서버 시작
 */
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║        API Server Running                      ║
╠════════════════════════════════════════════════╣
║ Port: ${PORT}                                    ║
║ Environment: ${NODE_ENV}                        ║
║ Time: ${new Date().toISOString()}           ║
╚════════════════════════════════════════════════╝
  `);
  
  console.log('\n📍 Available Endpoints:');
  console.log(`\n🔐 Auth:`);
  Object.entries(authRoutes).forEach(([key, path]) => {
    console.log(`   POST ${path}`);
  });
  
  console.log(`\n🗺️  Map:`);
  Object.entries(mapRoutes).forEach(([key, path]) => {
    console.log(`   POST ${path}`);
  });
  
  console.log(`\n📈 Analysis:`);
  Object.entries(analysisRoutes).forEach(([key, path]) => {
    console.log(`   GET/POST ${path}`);
  });
});

// 정상 종료 처리
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM 신호 수신. 서버 종료 중...');
  server.close(() => {
    console.log('✅ 서버 종료 완료');
    process.exit(0);
  });
});

module.exports = app;
