# ✦ One Track, Infinite Visions

> **"하나의 음악, 무한한 시각."**  
> 특정 음악 트랙을 중심으로 다양한 시각 창작물(아트웍, 뮤직비디오, 모션그래픽, 3D 비주얼 등)을 아카이빙하고 공유하는 크리에이티브 플랫폼입니다.

---

## 🎨 주요 화면 및 기능

1. **01. HOME (`/`)**
   - 시네마틱 헤로 섹션, 트랙 사운드 비주얼라이저 위젯, 탐색 CTA
   - 2단 비대칭 Featured Track & 무드 서치
   - 최신 작품 5열 그리드, 진행 중인 Open Call 배너 및 인기 크리에이터 큐레이션

2. **02. TRACK UNIVERSE (`/track/[trackId]`)**
   - 특정 트랙(예: *'Midnight - The Late Bloomers'*) 중심의 2차 창작물 아카이브
   - 28-밴드 사운드 웨이브폼 비주얼라이저
   - 카테고리별 실시간 칩 필터링 (`All`, `Artwork`, `Video`, `Motion`, `Illustration`, `Poster`)

3. **03. PROJECT DETAIL (`/project/[projectId]`)**
   - 비대칭 2단 쇼케이스 및 크리에이터 프로필/팔로우 인터랙션
   - 비하인드 4단계 제작 과정(아이디어 스케치, 레퍼런스, 시안, 파이널 렌더링) 스토리텔링
   - 좋아요, 댓글, 공유 인터랙션

4. **04. COMMUNITY (`/community`)**
   - 감상 노트, 피드백 & 질문, 프로젝트 모집, 자유 게시판
   - 새 글 작성 모달 및 즉각적인 피드 반영
   - 피드 좋아요 토글, 검색 및 정렬

5. **05. CREATOR PROFILE (`/creator/[creatorId]`)**
   - 크리에이터 통계(작품 수, 팔로워, 오픈콜 참여 이력)
   - 주요 사용 툴(Photoshop, Illustrator, After Effects, Cinema 4D, Blender 등)
   - 크리에이터 아카이브 포트폴리오 그리드

6. **06. OPEN CALL & MARKET (`/store`)**
   - **Open Call**: 싱글 *[SEA]* 앨범 커버 디자인 공모전 등 공식 프로젝트 지원 모달 연동
   - **Market**: 텍스처 팩, 타이포 포스터 템플릿, 글리치 FX, 3D 메탈릭 팩 등 크리에이터 디지털 에셋 마켓

7. **GLOBAL PERSISTENT AUDIO PLAYER**
   - 브라우저 어디로 이동하든 끊기지 않는 HTML5 싱글톤 오디오 플레이어
   - 실시간 재생/일시정지 동기화, 시크바 탐색, 볼륨/음소거 조절, 미니 파형 애니메이션 및 대기열 큐

8. **AUTH MODAL**
   - 전역 GNB에서 음악 중단 없이 띄울 수 있는 다크 테마 로그인 / 회원가입 모달

---

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: Deep Black (`#0A0A0C`), Dark Surface (`#141418`), Neon Lime Point (`#D4FF00`)

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저 접속
# http://localhost:3000
```

---

## 🌐 Vercel 배포 가이드

### 방법 1: GitHub 연동 자동 배포 (가장 권장)

1. GitHub에서 새 레포지토리를 생성합니다 (`https://github.com/new`).
2. 로컬 터미널에서 다음 명령어를 실행하여 푸시합니다:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
   git push -u origin main
   ```
3. [Vercel 대시보드](https://vercel.com/new)로 이동합니다.
4. **Import Git Repository**에서 방금 푸시한 레포지토리를 선택하고 **Deploy**를 클릭합니다.
5. Vercel 클라우드(Linux) 환경에서 자동으로 빌드되어 고유 도메인(`https://<project-name>.vercel.app`)으로 즉시 배포됩니다.

### 방법 2: Vercel CLI 배포

```bash
# Vercel 로그인
npx vercel login

# 프로덕션 배포
npx vercel --prod
```
