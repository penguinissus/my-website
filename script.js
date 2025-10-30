const canvas = document.getElementById('drawArea');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const submitBtn = document.getElementById('submitBtn');
const sike = document.getElementById('sike');

//Funny prank because I haven't figured out the good features yet
submitBtn.addEventListener('click', () => {
    sike.classList.remove('sike');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

//Drawing Section
let drawing = false;

clearBtn.addEventListener('click', ()=> {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

canvas.addEventListener('mousedown', ()=> {
    sike.classList.add('sike');
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