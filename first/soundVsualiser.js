const COLOR = 'red';
const CLASSNAME = "visualiser";

var body, num, array, width, context, logo, myElements, analyser, src, height;

body = document.querySelector('body');

num = 32;

array = new Uint8Array(num*2);

width = 10;

window.onclick = function(){

    if(context) return;

    body.querySelector('h1').remove();

    for(var i = 0 ; i < num ; i++){
        logo = document.createElement('div');
        logo.className = CLASSNAME;
        logo.style.background = COLOR;
        logo.style.minWidth = width+'px';
        body.appendChild(logo);
    }

    myElements = document.getElementsByClassName(CLASSNAME);
    context = new AudioContext();
    analyser = context.createAnalyser();

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        loop();
    }).catch(error => {
        alert(error + '\r\n\ Отклонено. Страница будет обновлена!');
        location.reload();
    });
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    for(var i = 0 ; i < num ; i++){
        height = array[i+num];
        myElements[i].style.minHeight = height+'px';
        myElements[i].style.opacity = 0.008*height;
    }
}