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

**URL :**  /api/경로
**Method :** 메서드
**Content-type :** application/json
```js
{
   user: {
      id: 유저 아이디,
      psword: 유저 비밀번호
   }
}
```
---
* Response  

**Status :** 상태코드
**Content-type :** application/json
```js
// 정상
{
   success: true
}

// 실패
{
   success: false,
   msg: 응답 메세지
}
```
---
- [ ] API 구현
