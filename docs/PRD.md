# 축구 경기 참석 투표 시스템 기획서

## 1. 프로젝트 개요
- **프로젝트명**: Football Vote (임시)
- **목적**: 축구 경기 일정에 대한 사용자들의 참석 여부를 투표하고 관리하는 웹 플랫폼
- **주요 기능**: 관리자용 일정 등록, 사용자용 참석 투표

## 2. 기술 스택
- **백엔드**: Spring Boot
- **데이터베이스**: H2 Database
- **프론트엔드**: React
- **빌드 도구**: Maven/Gradle

## 3. 주요 기능

### 3.1 관리자 기능
- **로그인/회원가입**
- **축구 일정 등록**
  - 경기 날짜/시간
  - 경기장 정보
  - 투표 마감 시간
- **투표 현황 조회**
- **참석자 목록 확인**

### 3.2 사용자 기능
- **투표 링크를 통한 접근**
- **참석 투표**
  - 참석/불참석 선택
- **참석자 목록 확인**

## 4. 데이터베이스 설계

### 4.1 주요 테이블

#### Users (사용자)
| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | Primary Key |
| username | String | 사용자 이름 |
| password | String | 비밀번호 |
| role | String | ADMIN/USER |
| created_at | DateTime | 생성일시 |

#### Matches (경기)
| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | Primary Key |
| home_team | String | 홈팀 |
| away_team | String | 원정팀 |
| match_date | DateTime | 경기 일시 |
| stadium | String | 경기장 |
| vote_end_time | DateTime | 투표 마감 시간 |
| created_at | DateTime | 생성일시 |
| created_by | Long | Foreign Key (Users) |

#### Votes (투표)
| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | Primary Key |
| match_id | Long | Foreign Key (Matches) |
| user_id | Long | Foreign Key (Users) |
| attendance | String | 참석/불참석 |
| created_at | DateTime | 생성일시 |

## 5. API 엔드포인트

### 5.1 관리자 API
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/auth/login | 로그인 |
| POST | /api/auth/register | 회원가입 |
| POST | /api/matches | 경기 일정 등록 |
| GET | /api/matches | 경기 일정 목록 조회 |
| GET | /api/matches/{id}/attendance | 경기별 참석자 목록 조회 |

### 5.2 사용자 API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/votes/{matchId} | 투표 정보 조회 |
| POST | /api/votes | 참석 투표 등록 |
| GET | /api/votes/{matchId}/attendance | 참석자 목록 조회 |

## 6. 보안
- JWT 기반 인증
- 투표 링크에 대한 접근 제어
- 관리자 권한 검증

## 7. UI/UX
- 반응형 웹 디자인
- 직관적인 투표 인터페이스
- 참석자 목록 표시
- 모바일 친화적 디자인

## 8. 향후 확장 가능한 기능
- 팀별 참석 통계
- 참석자 연락처 관리
- 경기장 위치 정보 연동
- 참석자 그룹 관리