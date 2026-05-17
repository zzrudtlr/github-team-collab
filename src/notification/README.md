# 알림 모듈 (Notification Module)

## 📋 개요

사용자 알림(Notification) 시스템을 담당하는 모듈입니다.

## 📁 파일 구조

```
src/notification/
├── notification.js    # 알림 서비스 클래스
├── notification.css   # 알림 UI 스타일
└── README.md          # 이 파일
```

## 🔔 주요 기능

### 기본 기능
- ✅ 알림 생성
- ✅ 알림 조회 (읽음/읽지 않음)
- ✅ 읽음 처리
- ✅ 알림 삭제

### 고급 기능
- ✅ 실시간 구독 (WebSocket)
- ✅ 알림 필터링 (타입, 기간)
- ✅ 일괄 삭제
- ✅ 통계 조회
- ✅ 읽지 않은 개수 카운트

## 🚀 사용 방법

### 초기화

```javascript
const { notificationService } = require('./notification.js');
```

### 알림 생성

```javascript
// 기본 알림
notificationService.createNotification(
  'user123',           // 사용자 ID
  'info',              // 타입: info, success, warning, error
  '새 메시지',         // 제목
  '새로운 메시지이 도착했습니다.' // 메시지
);

// 추가 데이터 포함
notificationService.createNotification(
  'user123',
  'success',
  '결제 완료',
  '결제가 정상 처리되었습니다.',
  { orderId: 'ORD-123', amount: 50000 }
);
```

### 알림 조회

```javascript
// 모든 알림 조회
const allNotifications = notificationService.getNotifications('user123');

// 읽지 않은 알림만 조회
const unreadNotifications = notificationService.getNotifications('user123', true);

// 읽지 않은 개수
const unreadCount = notificationService.getUnreadCount('user123');
```

### 알림 관리

```javascript
// 개별 알림 읽음 처리
notificationService.markAsRead(1);

// 모든 알림 읽음 처리
notificationService.markAllAsRead('user123');

// 알림 삭제
notificationService.deleteNotification(1);

// 여러 알림 삭제
notificationService.deleteMultiple('user123', [1, 2, 3]);
```

### 실시간 구독

```javascript
// 구독
const unsubscribe = notificationService.subscribe('user123', (notification) => {
  console.log('새 알림:', notification);
  // UI 업데이트
});

// 구독 해제
unsubscribe();
```

### 필터링 및 통계

```javascript
// 타입별 필터링
const errors = notificationService.filterNotifications('user123', 'error');
const recentWarnings = notificationService.filterNotifications('user123', 'warning', 7);

// 통계 조회
const stats = notificationService.getStatistics('user123');
// {
//   total: 10,
//   unread: 3,
//   byType: { info: 5, warning: 2, error: 2, success: 1 }
// }
```

## 📊 알림 타입

| 타입 | 색상 | 사용처 |
|------|------|--------|
| **info** | 파란색 | 정보성 알림 |
| **success** | 초록색 | 성공 알림 |
| **warning** | 주황색 | 경고 알림 |
| **error** | 빨강색 | 에러 알림 |

## 💾 알림 데이터 구조

```javascript
{
  id: 1,                                    // 알림 ID
  userId: 'user123',                        // 사용자 ID
  type: 'success',                          // 알림 타입
  title: '결제 완료',                       // 제목
  message: '결제가 정상 처리되었습니다.',   // 메시지
  data: { orderId: 'ORD-123' },            // 추가 데이터
  timestamp: '2026-05-17T10:00:00.000Z',   // 생성 시간
  read: false                               // 읽음 여부
}
```

## 🎨 UI 스타일링

### 알림 토스트 (notification.css)
- 우측 상단에 나타나는 토스트 알림
- 타입별 색상 구분
- 자동 슬라이드 인 애니메이션

### 알림 센터 (선택사항)
- 사이드 패널에서 모든 알림 확인
- 읽음/읽지 않음 구분
- 일괄 삭제 기능

## 📡 API 예상 명세

### 알림 생성 API
```
POST /api/notifications
Content-Type: application/json

요청:
{
  "type": "success",
  "title": "주문 완료",
  "message": "주문이 접수되었습니다.",
  "data": { "orderId": "ORD-123" }
}

응답:
{
  "success": true,
  "notification": { ... }
}
```

### 알림 조회 API
```
GET /api/notifications?unreadOnly=true

응답:
{
  "success": true,
  "notifications": [ ... ],
  "unreadCount": 3
}
```

### 읽음 처리 API
```
PATCH /api/notifications/:id/read

응답:
{
  "success": true,
  "notification": { ... }
}
```

## 📝 개선 예정 (TODO)

- [ ] WebSocket을 통한 실시간 알림
- [ ] 알림 스케줄링 (예약 알림)
- [ ] 알림 음성 지원
- [ ] 벨 아이콘 배지
- [ ] 알림 센터 UI 개선
- [ ] 알림 보관함
- [ ] 알림 설정 (타입별 수신 여부)
- [ ] 이메일 알림 연동
- [ ] SMS 알림 연동
- [ ] 테스트 코드 작성

## 🔗 관련 문서

- [상위 문서: README.md](../../README.md)
- [GitHub Flow: github-flow.md](../../docs/github-flow.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
