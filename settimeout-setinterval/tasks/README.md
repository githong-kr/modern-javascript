# [setTimeout과 setInterval을 이용한 호출 스케줄링](https://ko.javascript.info/settimeout-setinterval)

일정 시간이 지난 후에 원하는 함수를 예약 실행하는 `호출 스케줄링(scheduling a call)` 에 대해 학습합니다.

# 호출 스케줄링

- `setTimeout` 을 이용해 일정 시간이 지난 후에 함수를 실행
- `setInterval` 을 이용해 일정 시간 간격을 두고 함수를 실행

## setTimeout

```javascript
let timerId = setTimeout(func|code, [delay], [arg1], [arg2]...)
```

`func` 에는 함수의 참조를 세팅한다.

- `func()` 처럼 인자로써 함수를 실행하는 실수는 하지말자

`code` 에는 문자열을 세팅한다.

- 하위 호환성을 위해 존재하지만 가급적 사용하지 말자

`delay` 에는 millisecond 단위로 세팅한다.

`arg1`, `arg2` 에는 함수에 전달할 인자들을 순서대로 세팅한다.

---

반환값으로 `타이머 식별자(timer identifier)` 를 반환하고, 이 값과 `clearTimeout` 함수를 이용해 스케줄링을 취소할 수 있다.

> 예시

```javascript
let timerId = setTimeout(...)
clearTimeout(timerId)
```

## setInterval

`setTimeout` 함수와 문법이 동일하지만, `setInterval` 은 인자로 받은 함수를 주기적으로 실행하는 차이가 있다.

> 2초 간격으로 메시지를 보여주고, 5초 후에 정지하는 예제

```javascript
// 2초 간격으로 메시지를 보여줌
let timerId = setInterval(() => alert('째깍'), 2000)

// 5초 후에 정지
setTimeout(() => {
  clearInterval(timerId)
  alert('정지')
}, 5000)
```

브라우저에 alert 창이 떠 있더라도 내부 타이머는 멈추지 않는다.

## 중첩 setTimeout

일정 간격을 두고 실행하는 방법에는 `setInterval` 함수를 이용할 수도 있지만, `setTimeout` 을 중첩으로 사용하는 방법도 있다.

```javascript
// 2초 후에 최초로 tick 함수가 실행되고, 다시 2초 후 tick 함수가 반복 실행된다.
let timerId = setTimeout(function tick() {
  alert('째깍')
  timerId = setTimeout(tick, 2000)
}, 2000)
```

### 중첩 setTimeout vs setInterval

일정 시간동안 반복 수행을 한다는 점은 같지만,

중첩 setTimeout 은 delay 를 조정해가면서 스케줄링할 수 있어 유연하고,

> 예시

```javascript
let delay = 5000

let timerId = setTimeout(function request() {
  ...요청 보내기...

  if (서버 과부하로 인한 요청 실패) {
    // 요청 간격을 늘립니다.
    delay *= 2
  }

  timerId = setTimeout(request, delay)

}, delay)
```

무엇보다,

중첩 setTimeout 을 이용하는 방법은 지연 간격을 보장하지만,

setInterval 은 지연 간격을 보장하지 못한다.

> setInterval

```javascript
let i = 1
setInterval(function () {
  func(i++)
}, 100)
```

![setInterval](./resources/setInterval.png)

> 중첩 setTimeout

```javascript
let i = 1
setTimeout(function run() {
  func(i++)
  setTimeout(run, 100)
}, 100)
```

![setTimeout](./resources/setTimeout.png)

## 대기 시간이 0인 setTimeout

`delay` 를 0으로 설정하면 가능한 한 빨리 실행할 수 있다.

내부적으로 현재 실행 중인 스크립트를 수행한 뒤 스케줄링한 함수를 실행하게 되는데

이런 특징을 이용하면 스크립트의 실행이 종료된 직후에 원하는 함수를 실행시킬 수 있다.

> 예시
```javascript
setTimeout(() => alert("World"));

alert("Hello");

// Hello -> World
```

### 브라우저 환경에서는 delay 가 0 이라고 즉시 항상 실행되지 않는다.

브라우저는 [HTML5 표준](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)에서 정한 중첩 타이머 실행 간격 관련 제약을 준수한다.

해당 표준에는 `다섯 번째 중첩 타이머 이후엔 대기 시간을 최소 4밀리초 이상으로 강제해야 한다.` 라는 제약이 명시되어있다.

```javascript
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 이전 호출이 끝난 시점과 현재 호출이 시작된 시점의 시차를 기록

  if (start + 100 < Date.now()) alert(times); // 지연 간격이 100ms를 넘어가면, array를 얼럿창에 띄워줌
  else setTimeout(run); // 지연 간격이 100ms를 넘어가지 않으면 재스케줄링함
});

// 출력창 예시:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

다만, node.js 등 서버 사이드에서는 이런 제약이 없다.

추가적으로, 스케줄링 메서드를 사용할 때 명시한 지연 간격이 보장되지 않을 수도 있다는 점에 항상 유의해야 한다.

아래와 같은 상황이라면 지연 시간은 300ms 에서 1,000ms 까지도 오차가 생길 수 있다.

- CPU가 과부하 상태인 경우
- 브라우저 탭이 백그라운드 모드인 경우
- 노트북이 배터리에 의존해서 구동 중인 경우