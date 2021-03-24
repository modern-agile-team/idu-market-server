---
name: API 설계 및 구현
about: API 설계 및 구현을 위한 이슈 템플릿
title: "[기능] 타이틀"
labels: 서버
assignees: ''

---

## 목적
> 목적

<br>

### 💡 API 명세서
> 1. 인증 검사 API
* Request

**URL :**  /api/auth
**Method :** GET
**Headers :**
```js
// 헤더로 JWT를 실어서 보내야 합니다.
{
   x-auth-token: "eyJhbGciOiJIUzIJq2CZYtwVraPui4qwm5aT71aAIWcbzFac"
}
```

<br>

* Response  

**Status** 
>**성공 :** 200 (OK)
>**실패 :** 401 (Unauthorized)  

**Content-type :** application/json; charset=utf-8

* 성공
```js
{
   success: Boolean,
   msg: String,
   user: {
      id: String,
      email: String,
      name: String
   }
}
```
* 예시
```js
{
   success: true,
   msg: "로그인된 사용자입니다. 서비스 이용이 가능합니다.",
   user: {
      id: "test1",
      email: "test1@test.com",
      name: "테스트1"
   }
}
```

<br>

* 실패
```js
{
   success: Boolean,
   msg: String (실패 원인)
}
```
* 예시
```js
// JWT 토큰이 없는 경우
{
   success: false,
   msg: "JWT가 존재하지 않습니다."
}

// JWT 유효 시간 만료
{
   success: false,
   msg: "JWT의 유효 시간이 만료되었습니다."
}

// 유효하지 않는 토큰 (ex: 클라이언트가 임의로 토큰을 수정한 경우 등)
{
   success: false,
   msg: "유효하지 않은 JWT 입니다."
}
```

<br>
<br>
