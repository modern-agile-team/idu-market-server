<<<<<<< HEAD
---
name: API 설계 및 구현
about: API 설계 및 구현을 위한 이슈 템플릿
title: "[기능] 타이틀"
labels: 서버
assignees: ''

---

## 목적
> 목적

## 구현 기능
- [ ] API 설계
---
* Request

**URL :**  /api/리소스
**Method :** 메서드
**Content-type :** application/json
```js
{
   
}
```
---
* Response  

**Status :** 상태코드
**Content-type :** application/json
```js
// 정상
{
   success: true,
   msg: 응답 메세지
}

// 실패
{
   success: false,
   msg: 응답 메세지
}
```
---
- [ ] API 구현
=======
---
name: API 설계 및 구현
about: API 설계 및 구현을 위한 이슈 템플릿
title: "[기능] 타이틀"
labels: 서버
assignees: ''

---

## 📍 목적
> 목적

<br>

### 💡 API 명세서
> 1. 00 API
* Request

**URL :**  /api/00
**Method :** 00
**Content-type :** application/json; charset=utf-8
```js
{
   name: String,
   description: String
}
```
* 예시
```js
 { name: "개발하기", description: "로그인 기능 구현하기" }
```

<br>

* Response  

**Status** 
>**성공 :** 201 (Created)
>**실패 :** 400 (Bad Request)  

**Content-type :** application/json; charset=utf-8

* 성공
```js
{
   success: Boolean,
   msg: String
}
```
* 예시
```js
{
   success: true,
   msg: "00 등록에 성공하셨습니다."
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
{
   success: false,
   msg: "이름이 일치하지 않습니다."
}
```

<br>
<br>

> 1. 00 API
* Request

**URL :**  /api/00
**Method :** 00
**Content-type :** application/json; charset=utf-8
```js
{
   name: String,
   description: String
}
```
* 예시
```js
 { name: "개발하기", description: "로그인 기능 구현하기" }
```

<br>

* Response  

**Status** 
>**성공 :** 201 (Created)
>**실패 :** 400 (Bad Request)  

**Content-type :** application/json; charset=utf-8

* 성공
```js
{
   success: Boolean,
   msg: String
}
```
* 예시
```js
{
   success: true,
   msg: "00 등록에 성공하셨습니다."
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
{
   success: false,
   msg: "이름이 일치하지 않습니다."
}
```
>>>>>>> a6e6bb2430d2ceb225a90d3bcaa83b6fa2e476b0
