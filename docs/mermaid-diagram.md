# GitHub Flow 시각화 다이어그램

## 🌳 브랜치 구조 (메인 흐름)

```mermaid
graph TD
    A["feature/user-login<br/>(개인 개발)"] --> B["test<br/>(통합 테스트)"]
    C["feature/kakao-map<br/>(개인 개발)"] --> B
    D["feature/stock-analysis<br/>(개인 개발)"] --> B
    E["feature/api<br/>(개인 개발)"] --> B
    B --> F["main<br/>(운영 배포)"]
    
    style A fill:#e1f5ff
    style C fill:#e1f5ff
    style D fill:#e1f5ff
    style E fill:#e1f5ff
    style B fill:#fff3e0
    style F fill:#e8f5e9
```

## 📊 Pull Request 워크플로우

```mermaid
graph LR
    A["feature 브랜치<br/>코드 개발"] --> B["커밋 & 푸시"]
    B --> C["Pull Request 생성<br/>feature → test"]
    C --> D["코드 리뷰"]
    D --> E{승인?}
    E -->|Changes Requested| F["수정 및 추가 커밋"]
    F --> D
    E -->|Approved| G["Merge to test"]
    G --> H["통합 테스트"]
    H --> I["Pull Request 생성<br/>test → main"]
    I --> J["최종 검토"]
    J --> K{승인?}
    K -->|No| L["수정"]
    L --> J
    K -->|Yes| M["Merge to main<br/>배포!"]
    
    style A fill:#bbdefb
    style C fill:#fff9c4
    style D fill:#ffe0b2
    style G fill:#c8e6c9
    style M fill:#a5d6a7
```

## 🔄 동시 개발 시나리오

```mermaid
gitGraph commit id: "init"
branch feature/user-login
checkout feature/user-login
commit id: "login UI"
commit id: "email validation"
checkout main
branch feature/kakao-map
checkout feature/kakao-map
commit id: "map init"
commit id: "markers"
checkout main
branch test
checkout test
merge feature/user-login
commit id: "test integration"
checkout feature/kakao-map
commit id: "map styling"
checkout test
merge feature/kakao-map
checkout main
merge test
```

## ⏱️ 타임라인 (7일 개발 주기)

```mermaid
timeline
    title 팀 협업 7일 개발 주기
    
    Day 1 : Dev A: feature/user-login 시작 : Dev B: feature/kakao-map 시작 : Dev C: feature/api 시작
    Day 2 : Dev A: 개발 중 : Dev B: 개발 중 : Dev C: 개발 중
    Day 3 : Dev A: PR 제출 (test) : Dev B: 개발 중 : Dev C: 개발 중
    Day 4 : Dev A: 완료 & merge : Dev B: PR 제출 (test) : Dev C: 개발 중
    Day 5 : Dev B: 완료 & merge : Dev C: PR 제출 (test) : 통합 테스트 시작
    Day 6 : Dev C: 완료 & merge : test → main PR 준비 : 최종 테스트
    Day 7 : main으로 merge : 배포 준비 : 운영 서버 배포
```

## 🎯 브랜치 역할 다이어그램

```mermaid
graph TB
    subgraph feature["🔧 Feature 브랜치 (개인 작업)"]
        F1["feature/user-login"]
        F2["feature/kakao-map"]
        F3["feature/stock-analysis"]
        F4["feature/api"]
    end
    
    subgraph testing["🧪 Test 브랜치 (통합)"]
        T["모든 feature의<br/>통합 지점"]
    end
    
    subgraph prod["✅ Main 브랜치 (운영)"]
        M["운영 배포용<br/>안정적인 코드"]
    end
    
    F1 --> T
    F2 --> T
    F3 --> T
    F4 --> T
    T --> M
    
    style feature fill:#e3f2fd
    style testing fill:#fff3e0
    style prod fill:#e8f5e9
```

## 📋 상태 전환 다이어그램

```mermaid
stateDiagram-v2
    [*] --> feature: 브랜치 생성
    
    feature --> pr_review: PR 제출
    pr_review --> feature: 수정 요청
    pr_review --> test_merge: 승인
    
    test_merge --> test_branch: Merge to test
    test_branch --> test_run: 테스트 실행
    test_run --> ready: 준비 완료
    
    ready --> main_pr: PR 제출 (test→main)
    main_pr --> main_review: 최종 검토
    main_review --> ready: 수정 필요
    main_review --> prod: 승인
    
    prod --> main_merge: Merge to main
    main_merge --> deploy: 배포
    deploy --> [*]
    
    style feature fill:#bbdefb
    style test_branch fill:#fff9c4
    style prod fill:#a5d6a7
    style deploy fill:#81c784
```

## 🔀 충돌 해결 흐름

```mermaid
graph TD
    A["feature에서<br/>코드 수정"] --> B["test와<br/>충돌 발생"]
    B --> C["로컬에서<br/>rebase"]
    C --> D{충돌<br/>있음?}
    D -->|Yes| E["충돌 파일<br/>수동 해결"]
    E --> F["git add"]
    F --> G["git rebase<br/>--continue"]
    D -->|No| G
    G --> H["git push -f<br/>origin feature/xxx"]
    H --> I["PR 자동<br/>업데이트"]
    
    style A fill:#e1f5ff
    style B fill:#ffccbc
    style E fill:#fff3cd
    style I fill:#c8e6c9
```

## 💡 권장 Squash Merge 흐름

```mermaid
sequenceDiagram
    participant Dev as 개발자
    participant PR as Pull Request
    participant Test as test 브랜치
    
    Dev->>PR: feature 브랜치로 PR 생성
    Note over PR: 여러 개의 커밋
    
    Dev->>PR: 리뷰 후 수정 커밋 추가
    Note over PR: 더 많은 커밋...
    
    PR->>Test: Squash and Merge
    Note over Test: 모든 커밋이<br/>하나의 커밋으로 정리됨
    
    Test-->>Dev: test 브랜치 동기화
```

---

**다이어그램 생성 도구:** Mermaid

이 다이어그램들은 마크다운 기반이므로 GitHub에서 직접 렌더링됩니다.
