document.addEventListener('DOMContentLoaded', () => {
    loadMessages();

    document.getElementById('messageForm').addEventListener('submit', sendMessage);
});

function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
        messagesList.appendChild(messageDiv);
    });
}

function sendMessage(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const messageText = document.getElementById('message').value;

    const newMessage = {
        username,
        text: messageText
    };

    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    document.getElementById('messageForm').reset();
    loadMessages();
}
