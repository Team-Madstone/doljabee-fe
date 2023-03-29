# 🧗‍♀️ Doljabee


![ezgif com-video-to-gif (3)](https://user-images.githubusercontent.com/59763645/228170397-0fa2a26c-9972-44a1-9bcd-d5517beda264.gif)
![ezgif com-video-to-gif (4)](https://user-images.githubusercontent.com/59763645/228256639-c74e4e71-b592-4f32-8003-12b928bc27eb.gif)
![ezgif com-video-to-gif (5)](https://user-images.githubusercontent.com/59763645/228262868-5fc10fb8-1ea8-4376-b53c-e01cd25c6d47.gif)


<br>

## ✏️ About the Project
클라이밍에 관심이 있는 사람들이 모여 소통할 수 있는 커뮤니티

<br>
<br>
<br>

## 🛠 개발 환경

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Scss](https://img.shields.io/badge/Sass-%cc6699.svg?style=for-the-badge&logo=Sass&logoColor=%CC6699)

<br>
<br>
<br>

## 🧚 주요 라이브러리

### axios

* HTTP request & response

### react-hook-form

* form 관리 및 validation 체크

### context API

* 전역 상태 값 context에 저장하여 공유하기

### react-query

* 서버 상태 관리하기
* useInfiniteQuery를 통해 커서 기반 페이지네이션 구현

### Scss

* 코드의 재활용성을 높이고 가독성을 높이기 위해 Scss 사용

<br>
<br>
<br>

## 🖥 주요 기능

* 회원가입, 이메일 인증
  * react-hook-form을 이용한 validation 체크
  * 회원가입 시 입력한 이메일로 jwt 토큰을 넣어 가입 인증 이메일을 보냄
  * 유저가 이메일 확인하면 callbackUrl로 이동 후 주소창 뒤에 붙어있는 token 값 쿼리스트링으로 가져와서 토큰 인증
* 로그인, 로그아웃
  * accessToken을 매 요청마다 header에 넣어 보내기
  * 로그인한 유저 정보의 props drilling을 피하기 위해 useContext 사용
  * 로그아웃 시 BE에서 clearCookie로 refreshToken 제거
* 비밀번호 찾기
  * 입력한 이메일로 인증키를 전송해 인증키 확인 후 비번 재설정 
* 비밀번호 변경, 닉네임 수정
  * 로그인한 유저만 비밀번호 변경, 닉네임 수정 가능
* 피드 생성, 보기, 수정, 삭제 기능
  * 로그인한 유저만 피드 생성 가능
  * 본인이 작성한 피드만 수정하고 삭제 가능
* 댓글 기능, 좋아요, 공유하기
  * 로그인한 유저만 댓글쓰기/좋아요 가능
  * 본인이 작성한 댓글만 수정하고 삭제 가능
* 페이지네이션
  * useInfiniteQuery를 통해 무한 스크롤 구현
* pc, 패드, 휴대폰 사이즈 별 반응형 디자인
  * 미디어 쿼리를 이용해 반응형 디자인 제공

<br>
<br>
<br>

## 📒 프로젝트에 관한 기록
* [Toy Project 기록하기 1. 커뮤니티 사이트 기획하기](https://jihye-dev.tistory.com/59)
* [Toy Project 기록하기 2. axios로 HTTP 요청 보내기](https://jihye-dev.tistory.com/60) 
* [Toy Project 기록하기 3. React Hook Form 활용하기](https://jihye-dev.tistory.com/61)
* [Toy Project 기록하기 4. 파일 업로드하기 with multer](https://jihye-dev.tistory.com/62)
* [Toy Project 기록하기 5. 세션 인증 방식 vs 토큰 인증 방식](https://jihye-dev.tistory.com/63)
* [Toy Project 기록하기 6. 회원가입 & 이메일 인증하기](https://jihye-dev.tistory.com/64)
* [Toy Project 기록하기 7. 로그인 1. jwt로 로그인 구현하기](https://jihye-dev.tistory.com/65)
* [Toy Project 기록하기 8. 로그인 2. 전역 상태 똑똑하게 공유하기 with Context API](https://jihye-dev.tistory.com/66)
* [Toy Project 기록하기 9. React-Query로 서버 상태 관리하기](https://jihye-dev.tistory.com/67)
* [Toy Project 기록하기 10. React-Query로 무한스크롤 구현하기](https://jihye-dev.tistory.com/68)

<br>
<br>
<br>

## 🔗 BE 소스코드 
https://github.com/Team-Madstone/doljabee-be
