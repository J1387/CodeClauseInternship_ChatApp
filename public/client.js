const socket = io()  // To Connect the server to the terminal
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do {
    name = prompt('Please enter your name :')

}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})
// Above sendMessage not declared so we need to create a function for that
function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim(),
    }
    // Append
    appendMessage(msg, 'outgoing') 
    textarea.value = '' // empty after sending the text
    scrollToBottom()   
    // now we have to send to the server
    socket.emit('message', msg) 
}
// Now we have to create appendMessage Function
function appendMessage(msg, type){
    let mainDiv = document.createElement('div') // in html file that i created message_area div
    let className = type // it can be outgoing message and incoming message
    mainDiv.classList.add(className, 'message')
//the text we want to write and already writen before in html file h4 and p
let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
`
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Recieve  message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming') // show on the chat
    scrollToBottom()
})
// Scroll down after getting the new message 
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
