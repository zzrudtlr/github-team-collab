# 인증 모듈 (Auth Module)

## 📋 개요

사용자 인증(로그인, 회원가입, 토큰 관리) 기능을 담당하는 모듈입니다.

## 📁 파일 구조

```
src/auth/
├── login.js         # 로그인 페이지 & 로직
├── login.css        # 로그인 스타일
├── signup.js        # 회원가입 페이지 & 로직 (예정)
├── token.js         # JWT 토큰 관리 (예정)
└── README.md        # 이 파일
```

## 🔐 로그인 기능 (login.js)

### 기능
- ✅ 이메일 입력 폼
- ✅ 비밀번호 입력 폼
- ✅ 이메일 유효성 검사
- ✅ 비밀번호 길이 검사
- ✅ API 호출 (POST /api/auth/login)
- ✅ 토큰 저장 (localStorage)
- ✅ 에러 메시지 표시

### 사용 방법

#### HTML에서 로드
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="src/auth/login.css">
</head>
<body>
  <script src="src/auth/login.js"></script>
</body>
</html>
```

#### 클래스 사용
```javascript
const loginForm = new LoginForm();
loginForm.init();
```

### 유효성 검사 규칙

| 항목 | 규칙 |
|------|------|
| 이메일 | 유효한 이메일 형식 (example@domain.com) |
| 비밀번호 | 최소 8자 이상 |

### API 명세

#### 요청
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 응답 (성공)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### 응답 (실패)
```json
{
  "success": false,
  "message": "이메일 또는 비밀번호가 일치하지 않습니다."
}
```

## 🎨 스타일링

### 색상 스킴
- 주색상: `#667eea` (보라색)
- 부색상: `#764ba2` (진한 보라색)
- 배경: 그래디언트 `135deg`
- 에러색: `#ff4757` (빨강)

### 반응형 디자인
- 모바일 최적화 ✅
- 최소 너비: 320px
- 최대 너비: 400px

## 📝 개선 예정 (TODO)

- [ ] 회원가입 기능 (signup.js)
- [ ] JWT 토큰 관리 (token.js)
- [ ] 비밀번호 리셋 기능
- [ ] 2-Factor Authentication (2FA)
- [ ] 소셜 로그인 (Google, GitHub)
- [ ] 테스트 코드 작성

## 🔗 관련 문서

- [상위 문서: README.md](../../README.md)
- [GitHub Flow: github-flow.md](../../docs/github-flow.md)

---

**작성일:** 2026-05-17
**상태:** 개발 중 🚧
