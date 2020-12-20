# 레시피 공유 게시판 (클라우드 웹 서비스 기말 프로젝트)
공공데이터 포털의 공공데이터를 사용하는 웹/앱 어플리케이션을 AWS 서비스와 REST를 활용하여 Serverless하게 설계, 구현하는 프로젝트입니다.
## 어플리케이션 기획
### 어플리케이션 소개
- 여러 사용자들이 익명으로 이용하는 레시피 공유 게시판을 웹 서비스로
제공한다.  
- 게시판은 “기본 레시피” 과 “나만의 레시피” 총 두 개가 있다.  
- “기본 레시피”에선 공공데이터 포털에서 미리 제공하는 레시피를 검색, 조회만 할
수 있고 생성, 삭제는 불가능하다.  
- “나만의 레시피”에선 익명의 사용자들이 공유하는 레시피를 검색, 조회, 생성,
삭제할 수 있다.  
- 레시피를 클릭하면 해당 레시피와 관련된 정보를 조회할 수 있다.  
### 활용 공공데이터
- 레시피 기본 정보 : https://www.data.go.kr/data/15057205/openapi.do
- 레시피 재료 정보 : https://www.data.go.kr/data/15058981/openapi.do
- 레시피 과정 정보 : https://www.data.go.kr/data/15056535/openapi.do
### 제공 서비스
- **기본 레시피, 나만의 레시피(공통)**
1. 검색 창에 레시피 제목을 입력해 해당 키워드를 포함한 모든 레시피를
검색할 수 있다. (공백 입력 시 모든 레시피를 검색한다)
2. 레시피 목록 중 하나를 클릭하면 해당 레시피의 이름, 간단 설명, 재료
목록, 조리 과정 목록을 볼 수 있다
3. 검색 결과는 한 페이지에 10 개씩 보여지는데, 목록 하단의 번호 및
버튼을 클릭해 다음(이전) 페이지를 볼 수 있다.

- **나만의 레시피**
1. 레시피 생성 버튼을 누르면 레시피 생성 창이 나오고, 별명, 비밀번호,
제목, 간단 설명, 재료, 조리 과정을 입력하고 레시피를 생성(or 취소)할 수
있다.
2. 각 레시피마다 삭제 버튼이 존재하고 버튼 클릭 후 올바른 비밀번호 입력
시 해당 레시피를 삭제(or 취소)할 수 있다.
## 시스템 구조
![image](https://user-images.githubusercontent.com/23518329/102706446-5109dc00-42d5-11eb-88b2-ba26786b0b0e.png)  
## 어플리케이션 동작
### 게시판 공통
- **게시판 이동**
![image](https://user-images.githubusercontent.com/23518329/102706486-a940de00-42d5-11eb-929b-a47504da0462.png)  
![image](https://user-images.githubusercontent.com/23518329/102706487-ac3bce80-42d5-11eb-851a-c30ad8f8debb.png)  
![image](https://user-images.githubusercontent.com/23518329/102706488-ad6cfb80-42d5-11eb-8e99-b39b5b44302b.png)  
웹 사이트 상단의 네비게이션 바를 이용해 게시판을 이동할 수 있다.  
- **게시판 첫 방문**
![image](https://user-images.githubusercontent.com/23518329/102706495-c2498f00-42d5-11eb-802f-3171a76a04c0.png)  
![image](https://user-images.githubusercontent.com/23518329/102706497-c7a6d980-42d5-11eb-855a-97f727ab00ac.png)  
게시판으로 처음 이동 시 모든 레시피를 불러온다.  
- **게시판 검색**
![image](https://user-images.githubusercontent.com/23518329/102706509-e2794e00-42d5-11eb-9512-988e85c331fd.png)  
![image](https://user-images.githubusercontent.com/23518329/102706511-e4dba800-42d5-11eb-88ad-763a9b0b23f4.png)  
게시판 검색 시 해당 키워드를 포함한 모든 레시피를 불러온다.  
(나만의 레시피 게시판의 경우 오른쪽에 작성자의 별명과 삭제 버튼이 표시된다)  
- **게시판 재방문**
![image](https://user-images.githubusercontent.com/23518329/102706514-f2912d80-42d5-11eb-83ab-bf41d8c886bf.png)  
![image](https://user-images.githubusercontent.com/23518329/102706516-f45af100-42d5-11eb-885f-0c4b32d60cff.png)  
다른 게시판으로 이동한 후 다시 게시판으로 돌아오면 마지막으로 검색된 게시판들이 조회된다.  (브라우저 Session Storage 이용, 게시판 이동 시마다 API 요청을 하지 않아 낭비를 막음)  
