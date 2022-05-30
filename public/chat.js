// CLIENT-SIDE CODE

const socket = io()

// DOM Elements
let chatContainer = document.getElementById('chat-container');
let chatWindow = document.getElementById('chat-window');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let username = document.getElementById('username');
let message = document.getElementById('message');
let send = document.getElementById('send');

username.addEventListener('input', () => {
    if (username.value == '') {
        message.setAttribute('disabled', true)
        message.value = ''
        message.setAttribute('placeholder', 'Please choose an username')
    } else {
        message.removeAttribute('disabled')
        message.setAttribute('placeholder', 'Type a message here')
    }
})

send.addEventListener('click', () => {
    let data = {
        username: username.value,
        message: message.value
    }
    socket.emit('chat:message_client', data)
    actions.innerHTML = ''
    username.setAttribute('disabled', true)
})

message.addEventListener('keypress', () => {
    let name = username.value
    socket.emit('chat:writing_client', name)
})

socket.on('chat:message_server', (data) => {
    output.innerHTML += `<p><strong>${data.username}: </strong>${data.message}</p>`
    actions.innerHTML = ''
})

socket.on('chat:writing_server', (data) => {
    actions.innerHTML = `${data} is writing a message...`
})