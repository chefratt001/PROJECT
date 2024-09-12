// Initialize socket connection
const socket = io();

// Toggle chat box visibility
document.getElementById('toggle-chat').addEventListener('click', function() {
    const chatBox = document.getElementById('chat-box');
    chatBox.classList.toggle('active');
});

// Toggle sidebar visibility
document.querySelector('.chat-header button').addEventListener('click', function() {
    const chatSidebar = document.getElementById('chat-sidebar');
    chatSidebar.classList.toggle('active');
});

// Handle sending messages
document.getElementById('send-btn').addEventListener('click', function() {
    const message = document.getElementById('chat-input').value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        document.getElementById('chat-input').value = '';
    }
});

// Display received messages
socket.on('chat-message', function(msg) {
    const messageBox = document.getElementById('chat-messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = msg;
    messageBox.appendChild(newMessage);
});

// Handle user selection for chat
document.querySelectorAll('.person-box').forEach(person => {
    person.addEventListener('click', function() {
        const username = this.getAttribute('data-username');
        document.getElementById('chat-username').textContent = username;
    });
});