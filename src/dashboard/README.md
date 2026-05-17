# 대시보드 모듈 (Dashboard Module)

## 📋 개요

사용자 대시보드 기능을 담당하는 모듈입니다.

## 📁 파일 구조

```
src/dashboard/
├── dashboard.js   # 대시보드 클래스
├── dashboard.css  # 대시보드 스타일
└── README.md      # 이 파일
```

## 🎯 주요 기능

### 위젯 관리
- ✅ 위젯 추가/제거
- ✅ 위젯 업데이트
- ✅ 위젯 새로고침
- ✅ 위젯 순서 변경

### 대시보드 설정
- ✅ 레이아웃 변경 (Grid, List, Columns)
- ✅ 테마 변경 (Light, Dark)
- ✅ 자동 새로고침
- ✅ 상태 저장/복원

### 고급 기능
- ✅ 위젯 데이터 동기화
- ✅ localStorage 기반 지속성
- ✅ JSON 내보내기
- ✅ 대시보드 초기화

## 🚀 사용 방법

### 초기화

```javascript
const Dashboard = require('./dashboard.js');

const dashboard = new Dashboard('user123', {
  layout: 'grid',
  theme: 'light',
  autoRefresh: true,
  refreshInterval: 5000
});
```

### 위젯 추가

```javascript
// 기본 위젯
dashboard.addWidget({
  title: '판매 통계',
  type: 'chart',
  size: 'large'
});

// 추가 데이터 포함
dashboard.addWidget({
  title: '최근 주문',
  type: 'table',
  size: 'medium',
  data: { limit: 10, sort: 'date' }
});
```

### 위젯 관리

```javascript
// 위젯 업데이트
dashboard.updateWidget('widget-123', {
  title: '새로운 제목',
  size: 'large'
});

// 위젯 새로고침
dashboard.refreshWidget('widget-123');

// 모든 위젯 새로고침
dashboard.refreshWidget();

// 위젯 제거
dashboard.removeWidget('widget-123');

// 위젯 순서 변경
dashboard.reorderWidget('widget-123', 0);
```

### 레이아웃 및 테마

```javascript
// 레이아웃 변경
dashboard.setLayout('list');    // grid, list, columns

// 테마 변경
dashboard.setTheme('dark');     // light, dark

// 자동 새로고침
dashboard.setAutoRefresh(true);
```

### 상태 관리

```javascript
// 상태 저장
dashboard.saveState();

// 상태 복원
dashboard.loadState();

// 대시보드 정보 조회
const info = dashboard.getInfo();

// JSON으로 내보내기
const json = dashboard.export();

// 대시보드 초기화
dashboard.reset();
```

## 📊 위젯 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| **chart** | 차트 (선, 막대, 원형) | 판매 통계 |
| **table** | 테이블 | 주문 목록 |
| **metric** | 메트릭 (숫자) | 매출액 |
| **list** | 리스트 | 알림 |
| **custom** | 커스텀 위젯 | 사용자정의 |

## 🎨 레이아웃

### Grid (기본)
```
┌─────────────┬─────────────┐
│   Widget 1  │   Widget 2  │
├─────────────┼─────────────┤
│   Widget 3  │   Widget 4  │
└─────────────┴─────────────┘
```

### List
```
┌──────────────────────────┐
│      Widget 1            │
├──────────────────────────┤
│      Widget 2            │
├──────────────────────────┤
│      Widget 3            │
└──────────────────────────┘
```

### Columns
```
┌──────────────────┬──────────────────┐
│   Widget 1       │   Widget 2       │
│   (큼)           │   (큼)           │
├──────────────────┼──────────────────┤
│   Widget 3       │   Widget 4       │
└──────────────────┴──────────────────┘
```

## 💾 데이터 구조

### 위젯 객체
```javascript
{
  id: 'widget-1234567890',
  title: '판매 통계',
  type: 'chart',
  size: 'medium',              // small, medium, large
  position: { x: 0, y: 0 },
  data: { ... },
  refreshable: true,
  removable: true,
  lastUpdated: '2026-05-17T10:00:00.000Z'
}
```

### 대시보드 상태
```javascript
{
  userId: 'user123',
  layout: 'grid',
  theme: 'light',
  widgets: [ ... ],
  autoRefresh: true
}
```

## 📡 API 예상 명세

### 위젯 데이터 조회
```
GET /api/dashboard/widget/:widgetId

응답:
{
  "id": "widget-123",
  "title": "판매 통계",
  "data": { ... },
  "lastUpdated": "2026-05-17T10:00:00.000Z"
}
```

### 대시보드 저장
```
POST /api/dashboard/save
Content-Type: application/json

요청:
{
  "userId": "user123",
  "layout": "grid",
  "theme": "light",
  "widgets": [ ... ]
}

응답:
{
  "success": true,
  "message": "대시보드가 저장되었습니다."
}
```

## 🎯 사용 사례

### 1. 관리자 대시보드
```javascript
const adminDash = new Dashboard('admin-001');
adminDash.addWidget({ title: '매출', type: 'metric', size: 'large' });
adminDash.addWidget({ title: '사용자', type: 'metric', size: 'large' });
adminDash.addWidget({ title: '주문', type: 'table', size: 'large' });
```

### 2. 사용자 대시보드
```javascript
const userDash = new Dashboard('user-123');
userDash.addWidget({ title: '나의 주문', type: 'list' });
userDash.addWidget({ title: '계정 정보', type: 'custom' });
userDash.saveState(); // 상태 저장
```

## 📝 개선 예정 (TODO)

- [ ] 위젯 리사이징 기능
- [ ] Drag & Drop 위젯 정렬
- [ ] 위젯 템플릿
- [ ] 공유 가능한 대시보드
- [ ] 대시보드 스냅샷
- [ ] 실시간 데이터 동기화 (WebSocket)
- [ ] 고급 필터링
- [ ] 커스텀 CSS 지원
- [ ] 테스트 코드 작성

## 🔗 관련 문서

- [상위 문서: README.md](../../README.md)
- [GitHub Flow: github-flow.md](../../docs/github-flow.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
