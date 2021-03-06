# cafeteria-mobile

[![GitHub last commit](https://img.shields.io/github/last-commit/inu-appcenter/cafeteria-mobile)](https://github.com/inu-appcenter/cafeteria-mobile/commits)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/inu-appcenter/cafeteria-mobile)](https://github.com/inu-appcenter/cafeteria-mobile/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/inu-appcenter/cafeteria-mobile?style=shield)](https://github.com/inu-appcenter/cafeteria-mobile/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/inu-appcenter/cafeteria-mobile)](https://github.com/inu-appcenter/cafeteria-mobile/issues)
![GitHub closed issues](https://img.shields.io/github/issues-closed/inu-appcenter/cafeteria-mobile)
[![GitHub license](https://img.shields.io/github/license/inu-appcenter/cafeteria-mobile)](https://github.com/inu-appcenter/cafeteria-mobile/blob/master/LICENSE)

**Cafeteria 모바일 앱**

> #### Cafeteria 관련 저장소 일람
>
> ##### 서비스
> - API 서버: [cafeteria-server](https://github.com/inu-appcenter/cafeteria-server)
> - **모바일 앱**: [cafeteria-mobile](https://github.com/inu-appcenter/cafeteria-mobile)
>
> ##### 운영 관리
> - 콘솔 API 서버: [cafeteria-console-server](https://github.com/inu-appcenter/cafeteria-console-server)
> - 콘솔 웹 인터페이스: [cafeteria-console-web](https://github.com/inu-appcenter/cafeteria-console-web)
>
> ##### 배포 관리
> - API 서버 배포 스크립트: [cafeteria-server-deploy](https://github.com/inu-appcenter/cafeteria-server-deploy)

## 개요

다음 기능을 제공합니다:

- 식단 정보
- 식당 예약
- 학생 할인
- 고객 지원

## 업데이트 로그

### 2022.2.18 v4.9.1
- 예약 내역은 SSE로 받아옴.

### 2022.2.16 v4.9.0
- 취약 의존성 업데이트.
- 예약 가능 식당 목록에서 이모지 랜덤 노출.
- 안드로이드에서 텍스트 입력 필드의 커서 색상 변경.

### 2021.11.29 v4.8.4
- 바코드 5분마다 자동으로 갱신.
- 하단 네비게이션 바 높이 플랫폼에 맞게 조절.

### 2021.10.18 v4.8.3
- 식단에 상세정보 표시.

### 2021.10.9 v4.8.2
- 예약 안내 온보딩 표시하는 버튼 디자인 변경.
- 로그아웃 기능 추가.
- 하드코드된 텍스트 제거.

### 2021.10.8 v4.8.1
- 예약 시간대별로 정원 다르게.
- API 변경 반영.

### 2021.10.3 v4.8.0
- 예약 기능 정식 출시.
- 사소한 외관상 디테일 수정.
- 테스트 코드 모두 제거.

### 2021.10.3 v4.7.3
- 예약 온보딩 다시 볼 수 있게 힌트 제공.
- 예약 FAQ 추가.

### 2021.9.30 v4.7.2
- 예약 옵션 화면 UI 개선 및 설명 추가.
- 예약 목록이 완전히 로드되지 않는 문제 해결.
- 불필요한 의존성 정리.

### 2021.9.30 v4.7.1
- 예약 확인 창 UI 개선.
- 예약 완료 화면에 confetti 효과와 햅틱 피드백 추가.

### 2021.9.25 v4.7.0
- 예약 관련 수정사항 반영.
- 개인정보 수집 및 이용에 관한 동의 표시 준비.

### 2021.9.13 v4.6.1
- 예약 기능 베타 일부 공개.
- 로그인할 때에 개인정보 이용에 관한 안내 문구 표시.

### 2021.8.22 v4.6.0
- 예약 기능 추가.
- 안정성 개선.

### 2021.8.21 v4.5.5
- API 서버 주소 다시 설정. 

### 2021.8.21 v4.5.4
- 서버 API 변경 대응.

### 2021.8.2 v4.5.3 
- 생협 로고 크기 조정.
- iOS에서 바코드 클릭시 화면 밝아질 때에 fade 효과 추가.

### 2021.8.1 v4.5.2
- 중요한 OTA 업데이트 발견하면 스플래시 화면에서 바로 설치 진행.

### 2021.6.6 v4.5.1
- 공지 목록에서 요일이 영어로 표시되는 문제 해결.
- 재미난거 하나 추가.

### 2021.6.6 v4.5.0
- CodePush 업데이트 직접 처리.
- 취약점을 가지는 NPM 의존성 업데이트.
- 문의 연락처 버튼 아이콘 수정.

### 2021.6.5 v4.4.1
- 일부 안드로이드 기기에서 StackNavigation 그림자가 예상과 다르게 표시되는 문제 해결.

### 2021.6.3 v4.4.0
- 안드로이드에서 savedInstanceState 때문에 앱이 자주 죽는 문제 해결.

### 2021.6.1 v4.3.1
- RAM-bundle 더 이상 사용하지 않음.
- 4인치를 포함한 네모화면(홈버튼 달린) iOS 기기에서 하단 padding이 올바르지 않은 문제 해결.
- ItemSeparator가 정확히 한 픽셀 높이를 가지도록 수정.

### 2021.5.30 v4.3.0
- 버전 코드(Current Project Version, Version Code) 400부터 시작.
- 출시 및 배포.

### 2021.5.29 v4.3.0-beta.4
- iOS 인증서 및 프로파일 설정 변경.
- 베포 워크플로우 개선.

### 2021.5.29 v4.3.0-beta.3
- 버전 확인 UI 개선.
- 실행 중 강제 재시작 방지.

### 2021.5.29 v4.3.0-beta.2
- 업데이트 사용자 경험 개선.
- 불필요한 코드 삭제.

### 2021.5.28 v4.3.0-beta.1
- CodePush 통합.
- 버전 확인 UI 개선.
- 앱 표시 이름 수정.

### 2021.5.25 v4.3.0-beta.0
- React Native로 다시 작성.

## 라이센스

소스 코드에는 GPLv3 라이센스가 적용됩니다. 라이센스는 [이곳](/LICENSE)에서 확인하실 수 있습니다.
