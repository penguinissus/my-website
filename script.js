const canvas = document.getElementById('drawArea');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const messages = document.getElementById('messages');

//Submitting section
async function loadMessages() {
    const res = await fetch('/messages');
    const data = await res.json();
    data.forEach(msg => addMessageToPage(msg));
}

window.addEventListener('DOMContentLoaded', loadMessages);

submitBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if(!text) return;

    const res = await fetch('/messages', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text})
    });
    const data = await res.json();
    if (data.success) addMessageToPage({id: Date.now(), text});
    textInput.value = "";
});

//create message element
function addMessageToPage(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-item');

    const p = document.createElement('p');
    p.textContent = msg.text;

    messageDiv.appendChild(p);
    messages.appendChild(messageDiv);
}

//Drawing Section
let drawing = false;
canvas.addEventListener('mousedown', ()=> {
    drawing = true;
    ctx.beginPath(); //starts a new line
});

canvas.addEventListener('mouseup', ()=> {
    drawing = false;
    ctx.beginPath(); //resets path after lifting mouse
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ffffffff';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}