# GitHub Project 보드 사용 가이드

GitHub Projects를 활용한 팀 협업 및 작업 관리 방법입니다.

## 📊 GitHub Project 란?

GitHub Projects는 이슈, PR, 노트를 카드 형식으로 관리할 수 있는 도구입니다.

- **작업 추적:** To Do → In Progress → Done
- **우선순위 관리:** 중요도별 정렬
- **팀 협업:** 누가 뭘 하고 있는지 실시간 확인
- **타임라인:** 마일스톤과 데드라인 관리

## 🎯 프로젝트 구성

### 권장 구조
```
GitHub Projects
├── Backlog (백로그)
├── Ready (준비됨)
├── In Progress (진행 중)
├── In Review (리뷰 중)
├── Testing (테스트 중)
└── Done (완료)
```

## 🚀 초기 설정

### Step 1: Project 생성

1. GitHub 저장소 → "Projects" 탭
2. "New project" 클릭
3. 프로젝트 이름: "Team Development Board"
4. 템플릿: "Kanban"
5. "Create"

### Step 2: 컬럼 생성

기본 컬럼 생성:
- **Backlog**: 아직 시작하지 않은 작업
- **Ready**: 시작할 준비가 된 작업
- **In Progress**: 현재 진행 중인 작업
- **In Review**: PR 리뷰 중인 작업
- **Testing**: 테스트 진행 중인 작업
- **Done**: 완료된 작업

### Step 3: 자동화 설정

GitHub Projects의 자동화 기능:

```
컬럼별 자동 규칙 설정:

Backlog:
- 이슈 생성 시 자동 추가

Ready:
- 레이블 추가 시 자동 이동

In Progress:
- PR 생성 또는 이슈 할당 시 자동 이동

In Review:
- PR 생성됨 트리거로 자동 이동

Testing:
- "test 준비됨" 라벨 추가 시 자동 이동

Done:
- PR/이슈 닫힘 트리거로 자동 이동
```

## 📝 작업 추가 및 관리

### 이슈 생성 (작업 추가)

#### 로그인 기능 이슈 예시:
```
제목: feat: 사용자 로그인 기능 구현

설명:
## 요구사항
- [ ] 로그인 폼 UI 디자인
- [ ] 이메일 검증 로직
- [ ] 비밀번호 해싱
- [ ] JWT 토큰 생성
- [ ] 세션 관리

## 수용 조건
- 올바른 이메일/비밀번호로 로그인 가능
- 잘못된 정보 입력 시 에러 메시지 표시
- 로그인 후 대시보드로 리디렉트

## 예상 시간
- 약 5시간 (스팩/개발/테스트)

브랜치: feature/user-login
담당자: @username
레이블: feature, user-auth
마일스톤: v1.0
```

### 카드 관리

#### 1. 카드 추가
```
Project 보드에서:
1. 해당 컬럼에 "+" 클릭
2. "Create issue" 또는 "Add note"
3. 제목 입력
4. "Enter" 저장
```

#### 2. 카드 이동
```
드래그앤드롭으로 컬럼 간 이동:
Backlog → Ready → In Progress → In Review → Done
```

#### 3. 카드 상세 정보 설정
```
카드 클릭 후:
- 담당자 할당 (@username)
- 우선순위 설정 (High/Medium/Low)
- 레이블 추가 (#feature, #bug 등)
- 마일스톤 설정 (v1.0, v1.1 등)
- 예상 시간 입력
```

## 👥 팀 협업 플로우

### 시나리오: 팀 3명의 주간 스프린트

#### Week 1 - 월요일 아침
```
Planning Meeting:
1. Backlog에서 우선순위 높은 작업 확인
2. 이번 주 목표 설정
3. 담당자 할당

예시:
- feature/user-login → Dev A 할당
- feature/kakao-map → Dev B 할당
- feature/api → Dev C 할당
```

#### Week 1 - 월요일~목요일
```
Daily Progress:
- 각 개발자가 담당 작업을 "In Progress"로 이동
- 진행 상황을 댓글로 업데이트
- 문제 발생 시 댓글로 논의

예시 댓글:
"완료: UI 구현
진행 중: 이메일 검증 로직
예상: 내일 완료 후 PR 제출"
```

#### Week 1 - 금요일
```
PR Review Cycle:
1. Dev A: PR 제출 → 카드를 "In Review"로 이동
2. Dev B: 코드 리뷰 시작
3. Dev A: 피드백 반영 → 카드 유지 "In Review"
4. Dev B: 승인 → 카드를 "Testing"으로 이동
5. QA: 테스트 → 카드를 "Done"으로 이동
```

## 📊 보드 활용 팁

### 1. 우선순위 정렬
```
각 컬럼 상단에 우선순위 높은 작업 배치:
High Priority (상단)
├── 긴급 버그 수정
├── 핵심 기능 개발
└── ...

Medium Priority (중간)
└── ...

Low Priority (하단)
└── ...
```

### 2. 담당자 할당
```
카드 클릭 → "Assignees" → 팀원 선택

한 사람이 동시에 여러 작업:
- In Progress: 1개 (메인 작업)
- Ready: 2-3개 (다음 작업)
```

### 3. 레이블 활용
```
기능별:
- #feature (새 기능)
- #bug (버그 수정)
- #docs (문서)
- #refactor (리팩토링)

타입별:
- #frontend (프론트엔드)
- #backend (백엔드)
- #devops (운영)

우선도:
- #priority-high
- #priority-medium
- #priority-low
```

### 4. 마일스톤 설정
```
주요 버전 마일스톤:
- v1.0 (5월 완료)
- v1.1 (6월 완료)
- v2.0 (Q3 완료)

각 작업을 마일스톤에 할당하여
릴리스 일정 추적
```

## 📈 진행상황 추적

### 주간 리뷰 체크리스트

```markdown
## 주간 리뷰 (매주 금요일 15:00)

**이번 주 목표**
- [ ] feature/user-login 완료
- [ ] feature/kakao-map test 브랜치 병합
- [ ] feature/api PR 제출

**완료된 작업** ✅
- feature/user-login → main 배포됨
- API 문서 작성 완료

**진행 중인 작업** 🔄
- feature/kakao-map (80% 완료)
- feature/api (리뷰 중)

**블로킹 이슈** ⚠️
- kakao-map 라이브러리 버그 발견 → 우회 구현 중

**다음 주 예정**
- feature/stock-analysis 시작
- v1.0 배포 준비
```

### 진행도 계산
```
완료율 = (Done 개수) / (전체 개수) × 100%

예시:
Done: 8개
In Review: 2개
In Progress: 3개
Ready: 2개
Backlog: 5개
━━━━━━━━━━━
합계: 20개

완료율: 8/20 × 100% = 40%
```

## 🔗 PR과 이슈 연동

### PR과 Project 자동 연결

#### 방법 1: PR 설명에 이슈 링크
```markdown
# 변경사항

사용자 로그인 기능 구현

## 연결된 이슈
Closes #5  # 또는 Fixes #5, Resolves #5
```

#### 방법 2: PR 메뉴에서 직접 연결
1. PR 오른쪽 패널
2. "Projects" → Project 선택
3. 자동으로 이슈와 PR 연동됨

### 자동 상태 업데이트
```
PR 이벤트 → Project 자동 업데이트

- PR 생성됨 → "In Review"로 이동
- PR 댓글 달림 → 댓글 수 표시
- PR 병합됨 → "Done"으로 이동
- PR 닫힘 → 기본값 "Done"
```

## 💡 고급 기능

### 1. 커스텀 필드
```
Project 설정 → Custom fields 추가:
- Status (컬럼)
- Priority (Single select)
- Estimate (Number)
- Assignee (Single select)
- Due Date (Date)
```

### 2. 뷰 설정
```
프로젝트 내 여러 뷰 생성:

1. Kanban 보드 (기본)
   - 상태별 카드 관리

2. 테이블 뷰
   - 스프레드시트 형식
   - 필터링 및 정렬

3. 로드맵 뷰
   - 타임라인으로 일정 표시
   - 마일스톤별 작업 보기

4. 검색 필터 뷰
   - 담당자별
   - 우선도별
   - 마일스톤별
```

### 3. 자동화 워크플로우
```
설정 예시:

When: 이슈가 생성됨
Then: Backlog 컬럼에 자동 추가

When: PR이 생성됨
Then: In Review 컬럼으로 이동

When: PR이 병합됨
Then: Done 컬럼으로 이동

When: "ready" 레이블 추가됨
Then: Ready 컬럼으로 이동
```

## 📋 월간 리뷰

### 월말 종합 리포트 작성

```markdown
# 5월 종합 리포트

## 통계
- 총 작업: 30개
- 완료: 25개 (83%)
- 진행 중: 3개
- 백로그: 2개

## 완료된 기능
- ✅ User Login (feature/user-login)
- ✅ Kakao Map (feature/kakao-map)
- ✅ Stock Analysis (feature/stock-analysis)
- ✅ API Server (feature/api)

## 배포 버전
- v1.0 배포 (2026-05-17)
- 사용자: 500명
- 버그 리포트: 3건 (모두 수정됨)

## 6월 목표
- v1.1 릴리스
- 성능 최적화
- 테스트 커버리지 70% 달성
```

## 🎓 베스트 프랙티스

### ✅ 권장 사항
- 카드는 명확하고 구체적이어야 함
- 담당자는 1주일 내에 진행 가능한 작업량만 할당
- 매일 보드를 확인하고 상태 업데이트
- 스프린트 계획은 월요일 아침에
- 주간 리뷰는 금요일에 수행

### ❌ 피해야 할 것
- 너무 복잡한 카드 (분할 필요)
- 오래된 카드 방치 (정리 필요)
- 담당자 없는 작업 (누군가 책임져야 함)
- 마감 없는 백로그 (명확한 목표 필요)

---

**관련 문서:** 
- [docs/github-flow.md](docs/github-flow.md)
- [USAGE.md](USAGE.md)

**마지막 업데이트:** 2026-05-17
