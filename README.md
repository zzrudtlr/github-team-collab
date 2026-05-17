# GitHub 팀 협업 구조 - 샘플 프로젝트

여러 개발자가 동시에 작업하는 팀 협업 프로젝트 구조입니다.

## 📋 프로젝트 개요

이 프로젝트는 GitHub Flow 전략을 기반으로 팀 협업 구조를 제시합니다.

- **User Login:** 사용자 인증 기능
- **Kakao Map:** 카카오 지도 통합
- **Stock Analysis:** 주식 분석 기능
- **API:** 백엔드 API 서버

## 🌳 브랜치 전략

```
main (운영 배포)
  ↑
test (통합 테스트)
  ↑
feature/* (개인 개발)
  ├── feature/user-login
  ├── feature/kakao-map
  ├── feature/stock-analysis
  └── feature/api
```

### 워크플로우: feature → test → main

```
1️⃣ feature 브랜치에서 개발
2️⃣ test 브랜치로 병합 (통합 테스트)
3️⃣ main 브랜치로 병합 (운영 배포)
```

## 📖 작업 규칙

### 1. **main 브랜치** 🔒
- 운영 배포 환경용
- **직접 commit 금지**
- test 브랜치의 Pull Request만 수용
- 안정적인 코드만 유지

### 2. **test 브랜치** 🧪
- 통합 테스트 브랜치
- feature 브랜치의 코드를 먼저 테스트
- 모든 feature 브랜치가 merge되는 중간 단계

### 3. **feature/** 브랜치** 👨‍💻
- 개인 개발 브랜치
- 각 기능별로 독립적으로 작업
- 작업 완료 후 test로 Pull Request 생성
- 리뷰 후 merge

## 📁 폴더 구조

```
github-team-collab/
├── src/
│   ├── api/          # API 서버 코드
│   ├── auth/         # 인증 관련 코드
│   ├── map/          # 지도 기능 코드
│   └── analysis/     # 분석 기능 코드
├── docs/
│   ├── github-flow.md           # GitHub 흐름 가이드
│   └── mermaid-diagram.md       # 시각화 다이어그램
├── config/
│   └── .env.example             # 환경 설정 예시
├── README.md                     # 프로젝트 개요
├── USAGE.md                      # 사용 예시 명령어
├── GITHUB_PROJECT.md             # GitHub Project 사용 가이드
└── .gitignore                    # git 무시 파일

```

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone <repository-url>
cd github-team-collab
```

### 2. feature 브랜치 생성 후 작업
```bash
git checkout test
git pull origin test
git checkout -b feature/your-feature-name
# 코드 작성
git add .
git commit -m "feat: 기능 설명"
git push origin feature/your-feature-name
```

### 3. Pull Request 생성
- GitHub에서 feature → test로 PR 생성
- 코드 리뷰 받기
- merge 승인

### 4. test 브랜치로 병합 후 테스트
```bash
git checkout test
git pull origin test
# 통합 테스트
```

### 5. main 브랜치로 배포
- test → main으로 PR 생성
- 최종 검토 후 merge
- 운영 서버 배포

## 📚 더 알아보기

- 상세 가이드: [docs/github-flow.md](docs/github-flow.md)
- 사용 예시: [USAGE.md](USAGE.md)
- GitHub Project 보드: [GITHUB_PROJECT.md](GITHUB_PROJECT.md)
- 시각화 다이어그램: [docs/mermaid-diagram.md](docs/mermaid-diagram.md)

## 👥 팀 멤버

각 기능별로 담당자를 정합니다:

| 기능 | 담당자 | 브랜치 |
|------|--------|--------|
| User Login | - | feature/user-login |
| Kakao Map | - | feature/kakao-map |
| Stock Analysis | - | feature/stock-analysis |
| API | - | feature/api |

## 📞 문의

문제가 생기면 Issues를 등록해주세요.

---

**마지막 업데이트:** 2026-05-17
