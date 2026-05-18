const videoPreview = document.getElementById('preview');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const downloadLink = document.getElementById('downloadLink');

let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    videoPreview.srcObject = stream;

    // Configurar MediaRecorder
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'grabacion.webm';
      downloadLink.style.display = 'block';
      recordedChunks = [];
    };

    // Manejo de botones
    startButton.addEventListener('click', () => {
      mediaRecorder.start();
      startButton.disabled = true;
      stopButton.disabled = false;
    });

    stopButton.addEventListener('click', () => {
      mediaRecorder.stop();
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  })
  .catch((error) => {
    console.error('Error al acceder a la cámara/micrófono:', error);
  });
