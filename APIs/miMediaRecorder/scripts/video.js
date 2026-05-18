const mibtnIniciar = document.getElementById("btnIniciar");
const mibtnParar = document.getElementById('btnParar');
const miPreview = document.getElementById('miPreview');
const miDescargar = document.getElementById('miDescargar');

let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices
.getUserMedia({audio: true, video: true})
.then((stream) => {
    miPreview.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        miDescargar.href = url;
        miDescargar.download = "grabacion.webm";
        miDescargar.style.display = 'block';
        recordedChunks = [];
    };

    mibtnIniciar.onclick = () => {
        recordedChunks = [];
        mediaRecorder.start();
        mibtnIniciar.disabled = true;
        mibtnParar.disabled = false;
    };

    mibtnParar.onclick = () => {
        mediaRecorder.stop();
        mibtnIniciar.disabled = false;
        mibtnParar.disabled = true;
    };
})
.catch((err) => {
    console.error('Error accessing media devices:', err);
});
