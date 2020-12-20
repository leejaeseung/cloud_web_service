# 레시피 공유 게시판 (클라우드 웹 서비스 기말 프로젝트)
공공데이터 포털의 공공데이터를 사용하는 웹/앱 어플리케이션을 AWS 서비스와 REST를 활용하여 Serverless하게 설계, 구현하는 프로젝트입니다.
## 1. 어플리케이션 기획
### 1.1 어플리케이션 소개
- 여러 사용자들이 익명으로 이용하는 레시피 공유 게시판을 웹 서비스로
제공한다.  
- 게시판은 “기본 레시피” 과 “나만의 레시피” 총 두 개가 있다.  
- “기본 레시피”에선 공공데이터 포털에서 미리 제공하는 레시피를 검색, 조회만 할
수 있고 생성, 삭제는 불가능하다.  
- “나만의 레시피”에선 익명의 사용자들이 공유하는 레시피를 검색, 조회, 생성,
삭제할 수 있다.  
- 레시피를 클릭하면 해당 레시피와 관련된 정보를 조회할 수 있다.  
### 1.2 활용 공공데이터
- 레시피 기본 정보 : https://www.data.go.kr/data/15057205/openapi.do
- 레시피 재료 정보 : https://www.data.go.kr/data/15058981/openapi.do
- 레시피 과정 정보 : https://www.data.go.kr/data/15056535/openapi.do
### 1.3 제공 서비스
- ```기본 레시피, 나만의 레시피(공통)```
1. 검색 창에 레시피 제목을 입력해 해당 키워드를 포함한 모든 레시피를
검색할 수 있다. (공백 입력 시 모든 레시피를 검색한다)
2. 레시피 목록 중 하나를 클릭하면 해당 레시피의 이름, 간단 설명, 재료
목록, 조리 과정 목록을 볼 수 있다
3. 검색 결과는 한 페이지에 10 개씩 보여지는데, 목록 하단의 번호 및
버튼을 클릭해 다음(이전) 페이지를 볼 수 있다.

- """나만의 레시피"""
1. 레시피 생성 버튼을 누르면 레시피 생성 창이 나오고, 별명, 비밀번호,
제목, 간단 설명, 재료, 조리 과정을 입력하고 레시피를 생성(or 취소)할 수
있다.
2. 각 레시피마다 삭제 버튼이 존재하고 버튼 클릭 후 올바른 비밀번호 입력
시 해당 레시피를 삭제(or 취소)할 수 있다.
