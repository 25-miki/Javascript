//Un hash es simplemente un código único que identifica cada sala de chat. Piensa en él como 
// //una "clave secreta" que representa una sala específica.Por ejemplo, un chatroom_hash podría ser algo así:
//eca0e033df09376a41bb066dea54c7
//Este hash es generado por la API cuando se crea una nueva sala de chat.
// Se obtiene el chatroomHash y el nombre de usuario desde LocalStorage
const milocalStorage = window.localStorage;
let chatroomHash = milocalStorage.getItem('chatroomHash');
let username = milocalStorage.getItem('username');
let interval;

function showOptions() {
    username = document.getElementById('username').value;
    if (!username) return alert('Por favor, ingrese un nombre.');
    localStorage.setItem('username', username);
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('options-container').style.display = 'block';
}

function showJoinRoom() {
    document.getElementById('options-container').style.display = 'none';
    document.getElementById('join-container').style.display = 'block';
}

async function createRoom() {
    const response = await fetch('http://chatapi.alpati.net/create_chatroom_hash', {
        method: 'POST'
    });
    const data = await response.json();
    if (data.chatroom_hash) {
        startChat(data.chatroom_hash);
    } else {
        alert('Error al crear la sala.');
    }
}

function joinRoom() {
    const roomHash = document.getElementById('room-hash').value;
    if (!roomHash) return alert('Por favor, ingrese un hash de sala.');
    startChat(roomHash);
}

function startChat(hash) {
    chatroomHash = hash;
    localStorage.setItem('chatroomHash', chatroomHash);
    document.getElementById('options-container').style.display = 'none';
    document.getElementById('join-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('chatroom-hash').innerText = chatroomHash;
    loadMessages();
    interval = setInterval(loadMessages, 1000);
}

async function loadMessages() {
    const response = await fetch(`http://chatapi.alpati.net/get_messges/${chatroomHash}`);
    const messages = await response.json();

    console.log(messages);  // Imprime los mensajes para verificar la estructura

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';  // Limpiar mensajes anteriores
    messages.forEach(msg => {
        console.log(msg);  // Imprime cada mensaje para verificar la estructura de cada uno
        const timestamp = msg.message_timestamp;
        const date = new Date(timestamp);  // Usamos directamente el timestamp de fecha en formato string
        const formattedDate = date.toLocaleString('es-ES');  // Formato local

        messagesContainer.innerHTML += `<p><strong>${msg.message_user}</strong> [${formattedDate}]: ${msg.message_content}</p>`;
    });
}




async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (!message) return;

    // Enviar el mensaje
    await fetch('http://chatapi.alpati.net/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chatroom_hash: chatroomHash,
            message_content: message,
            message_user: username
        })
    });

    messageInput.value = '';  // Limpiar el campo de entrada
    loadMessages();  // Actualizar los mensajes después de enviar
}


function leaveChat() {
    localStorage.removeItem('chatroomHash');
    clearInterval(interval);
    location.reload();
}