# 사용 예시 명령어

자주 사용하는 Git 명령어와 GitHub 작업 흐름을 정리했습니다.

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/yourname/github-team-collab.git
cd github-team-collab
```

### 2. 현재 상태 확인
```bash
git status
git branch -vv
```

## 📝 일상적인 작업 흐름

### 기능 개발 시작

#### Step 1: test 브랜치 최신화
```bash
git checkout test
git pull origin test
```

#### Step 2: feature 브랜치 생성
```bash
git checkout -b feature/user-login
```

#### Step 3: 코드 작성 및 커밋
```bash
# 코드 작성...

# 변경사항 확인
git status

# 모든 파일 추가
git add .

# 특정 파일만 추가
git add src/auth/login.js

# 커밋 메시지와 함께 커밋
git commit -m "feat: 로그인 화면 UI 구현"

# 여러 줄 커밋 메시지
git commit -m "feat: 로그인 기능 구현

- 로그인 폼 UI 추가
- 이메일 검증 로직
- 에러 메시지 표시"
```

#### Step 4: 원격에 푸시
```bash
git push origin feature/user-login
```

#### Step 5: 첫 번째 푸시 후 추적 설정
```bash
git push -u origin feature/user-login
```

## 🔄 브랜치 관련 명령어

### 브랜치 확인
```bash
# 로컬 브랜치 목록
git branch

# 로컬 + 원격 모든 브랜치
git branch -a

# 브랜치 상세 정보 (로컬)
git branch -vv

# 원격 브랜치 추적 설정 상태
git branch -u origin/test
```

### 브랜치 생성 및 이동
```bash
# 새 브랜치 생성
git branch feature/new-feature

# 새 브랜치 생성 후 이동 (한 번에)
git checkout -b feature/new-feature

# 브랜치 이동
git checkout test

# 브랜치 이름 변경
git branch -m old-name new-name

# 브랜치 삭제 (로컬)
git branch -d feature/old-feature

# 강제 삭제
git branch -D feature/old-feature

# 원격 브랜치 삭제
git push origin --delete feature/old-feature
```

## 📤 커밋 및 푸시

### 변경사항 추가
```bash
# 모든 변경사항 추가
git add .

# 특정 파일 추가
git add src/auth/login.js src/auth/signup.js

# 파일 삭제 후 추가
git add -A

# 대화형 모드 (선택적으로 추가)
git add -p
```

### 커밋 메시지 규칙
```bash
# ✅ 좋은 예시
git commit -m "feat: 사용자 프로필 페이지 구현"
git commit -m "fix: 로그인 버튼 동작 오류 수정"
git commit -m "docs: API 문서 업데이트"
git commit -m "refactor: 인증 로직 개선"

# ❌ 나쁜 예시
git commit -m "update"
git commit -m "fix stuff"
git commit -m "123"
```

### 푸시 및 풀
```bash
# 현재 브랜치 푸시
git push

# 특정 브랜치 푸시
git push origin feature/user-login

# 원격 브랜치 최신 정보 가져오기
git fetch origin

# 원격에서 최신 데이터 받고 병합
git pull origin test

# 리베이스로 병합 (선형 히스토리)
git pull --rebase origin test

# 강제 푸시 (주의!)
git push -f origin feature/user-login

# 강제 푸시 (safer)
git push --force-with-lease origin feature/user-login
```

## 🔀 병합 및 충돌 해결

### 로컬에서 test와 동기화
```bash
# 방법 1: merge (병렬 히스토리)
git fetch origin
git merge origin/test

# 방법 2: rebase (선형 히스토리) - 권장
git fetch origin
git rebase origin/test
```

### 충돌 해결
```bash
# 충돌 파일 확인
git status

# 충돌 파일 내용 확인
git diff

# 충돌 해결 후 추가
git add <충돌-파일>

# rebase 계속
git rebase --continue

# rebase 취소
git rebase --abort

# merge 취소
git merge --abort
```

## 📊 상태 및 로그 확인

### 커밋 로그
```bash
# 간단한 로그
git log --oneline

# 최근 10개 커밋
git log -10

# 그래프 형태로 표시
git log --oneline --graph --all

# 특정 브랜치의 로그
git log test..feature/user-login

# 특정 파일의 변경 이력
git log -p src/auth/login.js

# 한 줄 요약
git log --oneline -n 20
```

### 변경사항 확인
```bash
# 스테이징 전 변경사항
git diff

# 스테이징 후 변경사항
git diff --cached

# 이전 커밋과 비교
git diff HEAD~1

# 두 브랜치 비교
git diff test feature/user-login

# 특정 파일의 변경사항
git diff src/auth/login.js
```

### 상태 확인
```bash
# 현재 상태
git status

# 간단한 상태
git status -s

# 브랜치 정보 상세
git branch -vv
```

## 🔧 실용적인 상황별 명령어

### 마지막 커밋 메시지 수정
```bash
git commit --amend -m "새로운 메시지"

# 날짜는 유지하고 메시지만 수정
git commit --amend --no-edit
```

### 마지막 커밋 취소
```bash
# 커밋 취소 (변경사항 유지)
git reset HEAD~1

# 커밋 취소 (변경사항 폐기)
git reset --hard HEAD~1
```

### 특정 파일의 변경사항 취소
```bash
# 스테이징 전 취소
git checkout -- src/auth/login.js

# 스테이징 후 취소
git reset HEAD src/auth/login.js
```

### 여러 커밋 합치기 (rebase)
```bash
# 최근 3개 커밋 합치기
git rebase -i HEAD~3

# 에디터에서 'pick' → 'squash' 또는 's'로 변경
# 저장 후 커밋 메시지 입력

# 또는 강제 푸시
git push -f origin feature/user-login
```

### 특정 커밋 찾기
```bash
# 커밋 메시지로 검색
git log --grep="로그인"

# 작성자로 검색
git log --author="John"

# 특정 기간 검색
git log --since="2026-05-01" --until="2026-05-17"
```

## 🔍 문제 해결

### 실수로 main에 푸시한 경우
```bash
# main에서 마지막 커밋 취소
git checkout main
git reset --hard HEAD~1
git push -f origin main  # ⚠️ 주의: 팀과 협의 필수

# 또는 revert로 롤백 (더 안전)
git revert HEAD
git push origin main
```

### feature를 test의 최신 상태로 동기화
```bash
git checkout feature/user-login
git fetch origin
git rebase origin/test

# 충돌이 있으면 해결 후
git add .
git rebase --continue
```

### 실수로 다른 브랜치의 파일 받기
```bash
# test 브랜치의 파일을 현재 브랜치로 가져오기
git checkout test -- src/auth/login.js
```

### 커밋 히스토리 확인 (reflog)
```bash
# 모든 작업 이력 확인
git reflog

# 특정 커밋으로 돌아가기
git reset --hard abc1234
```

## 📋 GitHub에서 수행할 작업

### Pull Request 생성
1. GitHub 저장소로 이동
2. "Compare & Pull Request" 버튼 클릭
3. Base: `test`, Compare: `feature/user-login`
4. 제목: "feat: 로그인 기능 구현"
5. 설명 작성
6. "Create Pull Request" 클릭

### Pull Request 검토
1. "Files changed" 탭에서 코드 확인
2. 줄 번호를 클릭해 댓글 추가
3. "Review changes" 클릭
4. "Approve" 또는 "Request changes" 선택

### Pull Request 병합
```bash
# GitHub에서 "Squash and merge" 선택
# 또는 로컬에서 수동 병합
git checkout test
git pull origin test
git merge --no-ff feature/user-login
git push origin test
```

## 💡 팁과 트릭

### Alias 설정 (선택사항)
```bash
# 자주 사용하는 명령어 단축키
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --all'

# 사용 예
git co feature/user-login
git st
git visual
```

### 커밋 전 미리보기
```bash
# diff 확인 후 커밋
git add .
git diff --cached
git commit -m "메시지"
```

### 브랜치 정리 (완료된 feature 삭제)
```bash
# 로컬에서 삭제
git branch -d feature/user-login

# 원격에서 삭제
git push origin --delete feature/user-login

# 한 번에 정리
git branch -r --merged | grep -v main | grep -v test | xargs git branch -D
```

---

**더 많은 정보:** [docs/github-flow.md](docs/github-flow.md)

**마지막 업데이트:** 2026-05-17
