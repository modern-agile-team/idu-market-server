const chat = document.querySelector('#chat');
const socket = io();

// 접속 되었을 때 실행
socket.on('connect', function() {
    //이름 입력받기
    const name = prompt('반갑습니다!', '')

    //이름이 빈칸인 경우
    if(!name) {
        name = '익명'
    }

    //서버에 새로운 유저가 왔다고 알림
    socket.emit('newUser', name);
})

// 타입에 따라 적용할 클래스를 다르게 지정
socket.on('update', function(data) {
    const msg = document.createElement('div')
    const nodeChat = document.createTextNode(`${data.name}: ${data.message}`)
    let className = ''

    switch(data.type) {
        case 'message':
            className = 'other'
            break

        case 'connect':
            className = 'connect'
            break

        case 'disconnect':
            className = 'disconnect'
            break
    }

    msg.classList.add(className);
    msg.appendChild(nodeChat);
    chat.appendChild(msg);
})

// 전송 함수
function send() {
    //입력되어 있는 데이터 가져오기
    const message = document.querySelector('#test').value;
    
    //가져 왔으니 데이터 빈칸으로 변경
    document.querySelector('#test').value = '';

    //내가 전송할 메시지 클라이언트에게 표시
    const msg = document.createElement('div');
    const nodeMessage = document.createTextNode(message);
    msg.classList.add('me');
    msg.appendChild(nodeMessage);
    chat.appendChild(msg);

    //서버로 message 이벤트 전달 + 데이터와 함께
    socket.emit('message', {type: 'message', message: message});
}
