# GitHub Flow 상세 가이드

팀 협업을 위한 Git 브랜치 전략과 워크플로우입니다.

## 🎯 목표

- 여러 개발자가 **동시에 안전하게 작업**
- **코드 품질 유지** (리뷰 및 테스트)
- **배포 환경 보호** (main 브랜치의 안정성)

## 🌳 브랜치 계층 구조

```
┌─────────────────────────────────────┐
│         main (운영 배포)             │
│    ✅ 안정적, 운영 환경 동기화      │
└──────────────▲──────────────────────┘
               │ PR + 최종 검토
               │
┌──────────────┴──────────────────────┐
│        test (통합 테스트)            │
│  ✅ 모든 기능 통합 테스트            │
└──────────────▲──────────────────────┘
               │ PR + 리뷰
               │
┌──────────────┴──────────────────────┐
│      feature/* (개인 개발)           │
│  ✅ 각 개발자의 기능별 작업          │
└─────────────────────────────────────┘
```

## 📝 작업 흐름 (Step by Step)

### 1️⃣ **새 기능 개발 시작**

#### Step 1: test 브랜치 최신 동기화
```bash
git checkout test
git pull origin test
```

#### Step 2: feature 브랜치 생성
```bash
git checkout -b feature/user-login
```

이름 규칙:
- `feature/user-login` ✅
- `feature/kakao-map` ✅
- `feature/api-endpoint` ✅
- `bugfix/login-error` ✅
- `docs/api-documentation` ✅

### 2️⃣ **코드 개발**

#### Step 1: 코드 작성 및 커밋
```bash
# 코드 작성
# ...

# 변경사항 확인
git status

# 파일 추가
git add .

# 커밋 (명확한 메시지 필수)
git commit -m "feat: 로그인 화면 UI 구현"
```

커밋 메시지 규칙:
- `feat:` - 새 기능
- `fix:` - 버그 수정
- `docs:` - 문서 수정
- `style:` - 코드 스타일 (포매팅, 세미콜론 등)
- `refactor:` - 코드 리팩토링
- `test:` - 테스트 추가

#### Step 2: 원격 저장소에 푸시
```bash
git push origin feature/user-login
```

### 3️⃣ **Pull Request 생성 (feature → test)**

#### GitHub에서:
1. Compare & Pull Request 버튼 클릭
2. 기본 브랜치: `test` (자동 선택됨)
3. 비교 브랜치: `feature/user-login`
4. 제목 작성: "feat: 로그인 기능 구현"
5. 설명 작성:
   ```markdown
   ## 변경사항
   - 로그인 페이지 UI 구현
   - 이메일 검증 로직 추가
   
   ## 테스트 방법
   1. 로그인 페이지 접속
   2. 이메일 입력 후 검증
   
   ## 스크린샷
   [필요시 추가]
   ```
6. Create Pull Request 클릭

### 4️⃣ **코드 리뷰**

#### 리뷰어가:
1. 코드 변경사항 검토
2. 질문이나 수정 요청 댓글
3. Approve 또는 Request Changes

#### 개발자가:
1. 리뷰 의견 반영
2. 필요시 추가 커밋
   ```bash
   git add .
   git commit -m "fix: 리뷰 의견 반영"
   git push origin feature/user-login
   ```
3. PR 자동 업데이트됨

### 5️⃣ **test 브랜치로 병합**

#### 승인 후:
1. GitHub에서 "Merge pull request" 클릭
2. "Squash and merge" 권장 (커밋 정리)
3. 로컬에서 동기화:
   ```bash
   git checkout test
   git pull origin test
   ```

### 6️⃣ **통합 테스트**

#### test 브랜치에서:
```bash
# 의존성 설치
npm install  # or pip install 등

# 테스트 실행
npm test

# 서버 실행하여 수동 테스트
npm start
```

#### 테스트 항목:
- [ ] 모든 feature 기능이 정상 작동
- [ ] 기존 기능과 충돌 없음
- [ ] 환경 설정 정상
- [ ] 성능 이슈 없음

### 7️⃣ **main 브랜치로 배포**

#### Pull Request 생성 (test → main)
1. GitHub에서 Compare & Pull Request
2. 기본 브랜치: `main`
3. 비교 브랜치: `test`
4. 제목: "release: v1.0.0"
5. 설명: 이번 릴리스에 포함된 모든 기능 나열

#### 최종 검토 및 배포:
1. 팀 리드 또는 PM 최종 검토
2. 승인 후 merge
3. 태그 생성 (선택):
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. 운영 서버 배포

## 🔄 동시 작업 예시

**시나리오:** 3명의 개발자가 동시에 작업

```
Day 1:
- Dev A: feature/user-login 시작
- Dev B: feature/kakao-map 시작
- Dev C: feature/api 시작

Day 2-3:
- Dev A: feature/user-login → test (PR 생성)
- Dev B: feature/kakao-map 계속 개발
- Dev C: feature/api 계속 개발

Day 4:
- Dev A의 PR 리뷰 및 merge
- Dev B: feature/kakao-map → test (PR 생성)
- Dev C: feature/api 계속 개발

Day 5:
- test 브랜치에서 통합 테스트
- Dev B의 PR 리뷰 및 merge
- Dev C: feature/api → test (PR 생성)

Day 6:
- Dev C의 PR 리뷰 및 merge
- test → main (배포 준비)

Day 7:
- 최종 검토
- main으로 merge (배포)
```

## ⚠️ 주의사항

### ❌ 하면 안 되는 것

1. **main에 직접 commit**
   ```bash
   # ❌ 절대 금지
   git checkout main
   git commit -m "fix: 버그 수정"
   git push origin main
   ```

2. **feature에서 main으로 직접 merge**
   ```bash
   # ❌ 절대 금지
   git merge main feature/xxx
   git push origin feature/xxx
   ```

3. **test 없이 main으로 push**
   - 반드시 test에서 통합 테스트 후 진행

### ✅ 해야 할 것

1. **정기적으로 test와 동기화**
   ```bash
   git fetch origin
   git rebase origin/test
   ```

2. **커밋 메시지 명확하게**
   ```bash
   # ✅ 좋음
   git commit -m "feat: 사용자 프로필 페이지 구현"
   
   # ❌ 나쁨
   git commit -m "update"
   ```

3. **작은 PR로 자주 merge**
   - 큰 PR보다 작은 PR이 리뷰하기 쉬움
   - 충돌 해결도 간단

## 📊 브랜치 상태 확인

```bash
# 로컬 브랜치 확인
git branch

# 원격 브랜치 확인
git branch -r

# 브랜치 상태 한눈에
git branch -vv

# 현재 브랜치의 origin과 차이
git log --oneline origin/test..HEAD
```

## 🔗 관련 문서

- [USAGE.md](../USAGE.md) - 자주 사용하는 명령어
- [GITHUB_PROJECT.md](../GITHUB_PROJECT.md) - GitHub Project 보드 사용법

---

**최종 업데이트:** 2026-05-17
