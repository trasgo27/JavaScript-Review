/** @type {HTMLVideoElement} */
const miPreview =
document.getElementById('miPreview');

/** @type {HTMLButtonElement}*/
const mibtnGrabar =
document.getElementById('btnGrabar');

/** @type {HTMLButtonElement}*/
const mibtnParar =
document.getElementById('btnParar');

/** @type {HTMLAnchorElement}*/
const miEnlace =
document.getElementById('miEnlace');

let mediaRecorder;
let totalBlob;
let chunkBlobs = [];

//Request permission
navigator.mediaDevices
.getUserMedia({audio:true,video:true}) //Creates a Promise
.then((stream)=> {
    miPreview.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event)=>{
        if(event.data.size > 0){
            chunkBlobs.push(event.data);
        }
    };

    mediaRecorder.onstop = ()=>{
        const blob = new Blob(chunkBlobs,{type:'video/webm'});
        const url  = URL.createObjectURL(blob);
        miEnlace.href = url;
        miEnlace.download = 'grabaciones.webm';
        miEnlace.style.display = 'block';
        chunkBlobs = [];
    };

    mibtnGrabar.onclick = ()=>{
        chunkBlobs = [];
        mediaRecorder.start();
        mibtnGrabar.disabled = true;
        mibtnParar.disabled  = false;
    };

    mibtnParar.onclick = () =>{
        mediaRecorder.stop();
        mibtnGrabar.disabled = false;
        mibtnParar.disabled  = true;
    };
    
})
.catch((err)=>{
    console.error('Error accediendo a dispositivos media: ', err);
    const msg = document.createElement('p');
    msg.style.color = 'red';
    msg.style.fontSize = '18px';
    msg.textContent = '❌ Error: ' + err.message + ' — Revisa permisos de cámara/micrófono';
    document.body.prepend(msg);
});