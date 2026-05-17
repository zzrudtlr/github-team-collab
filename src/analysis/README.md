# 분석 모듈 (Analysis Module)

## 📋 개요

주식 분석 및 기술 지표 계산 기능을 담당하는 모듈입니다.

## 📁 파일 구조

```
src/analysis/
├── stock-analysis.js   # 주식 분석 클래스
├── utils.js            # 유틸리티 함수 (예정)
└── README.md           # 이 파일
```

## 📈 주요 기능

### 기본 정보 조회
- ✅ 주식 정보 조회
- ✅ 데이터 캐싱

### 기술 분석 지표
- ✅ 이동평균 (Moving Average, MA)
- ✅ RSI (Relative Strength Index)
- ✅ MACD (Moving Average Convergence Divergence)
- ✅ 변동성 (Volatility)

### 성과 분석
- ✅ 수익률 계산
- ✅ 최대 낙폭 (Max Drawdown)
- ✅ 추천 신호 생성

## 🚀 사용 방법

### 초기화

```javascript
const analyzer = new StockAnalyzer(
  'YOUR_API_KEY',
  'https://api.example.com'
);
```

### 주식 정보 조회

```javascript
const stockInfo = await analyzer.getStockInfo('AAPL');
console.log(stockInfo);
// {
//   symbol: 'AAPL',
//   name: 'Apple Inc.',
//   price: 150.25,
//   change: 2.15,
//   changePercent: 1.45
// }
```

### 이동평균 계산

```javascript
const prices = [
  { date: '2026-05-01', close: 100 },
  { date: '2026-05-02', close: 102 },
  { date: '2026-05-03', close: 101 },
  // ...
];

const ma = analyzer.calculateMovingAverage(prices, 20);
// [
//   { date: '2026-05-20', ma: 101.5 },
//   { date: '2026-05-21', ma: 102.0 },
//   ...
// ]
```

### RSI 계산

```javascript
const rsi = analyzer.calculateRSI(prices, 14);
// [
//   { date: '2026-05-15', rsi: 45.2 },
//   { date: '2026-05-16', rsi: 52.8 },
//   ...
// ]

// RSI 해석:
// - RSI < 30: 과매도 (매수 신호)
// - RSI > 70: 과매수 (매도 신호)
```

### MACD 계산

```javascript
const macd = analyzer.calculateMACD(prices);
// [
//   { date: '2026-05-26', macd: 0.85 },
//   { date: '2026-05-27', macd: 0.92 },
//   ...
// ]
```

### 변동성 분석

```javascript
const volatility = analyzer.calculateVolatility(prices, 20);
// [
//   { date: '2026-05-20', volatility: 2.5 },
//   { date: '2026-05-21', volatility: 2.8 },
//   ...
// ]
```

### 성과 분석

```javascript
const performance = analyzer.calculatePerformance(
  prices,
  '2026-05-01',
  '2026-05-31'
);
// {
//   startDate: '2026-05-01',
//   endDate: '2026-05-31',
//   startPrice: 100,
//   endPrice: 115,
//   returnPercentage: 15,
//   maxPrice: 120,
//   minPrice: 95,
//   maxDrawdown: -20.83
// }
```

### 추천 신호 생성

```javascript
const indicators = {
  rsi: rsiArray,
  macd: macdArray,
  ma: maArray
};

const signal = analyzer.generateSignal(indicators);
// {
//   signals: [
//     { type: 'BUY', source: 'RSI', strength: 'strong' },
//     { type: 'BUY', source: 'MACD', strength: 'medium' }
//   ],
//   recommendation: 'BUY',
//   timestamp: '2026-05-17T10:00:00.000Z'
// }
```

## 📊 기술 지표 해석

### 이동평균 (MA)
- **정의:** 특정 기간 동안의 평균 가격
- **용도:** 추세 파악
- **해석:**
  - 가격 > MA: 상승 추세
  - 가격 < MA: 하락 추세

### RSI (0-100)
- **정의:** 가격 상승과 하락 정도를 비교한 지표
- **용도:** 과매수/과매도 판단
- **해석:**
  - RSI < 30: 과매도 (매수 신호)
  - 30-70: 중립
  - RSI > 70: 과매수 (매도 신호)

### MACD
- **정의:** 두 개의 이동평균 차이
- **용도:** 추세 변화 감지
- **해석:**
  - MACD > 0: 강세 신호
  - MACD < 0: 약세 신호
  - 0 교차: 추세 변화

### 변동성
- **정의:** 가격 변동의 크기
- **용도:** 리스크 측정
- **해석:**
  - 높은 변동성: 고리스크
  - 낮은 변동성: 저리스크

## 📡 API 명세

### 주식 정보 조회

**요청:**
```
GET /stock/{symbol}
Authorization: Bearer {API_KEY}
```

**응답:**
```json
{
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
```

## 📝 개선 예정 (TODO)

- [ ] Bollinger Bands 지표
- [ ] Stochastic Oscillator
- [ ] 포트폴리오 분석
- [ ] 백테스팅 기능
- [ ] 실시간 데이터 스트리밍
- [ ] 알람 기능
- [ ] 테스트 코드 작성

## 🔗 관련 문서

- [상위 문서: README.md](../../README.md)
- [GitHub Flow: github-flow.md](../../docs/github-flow.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
