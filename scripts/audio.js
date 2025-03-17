const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

analyser.connect(audioContext.destination);

const audioElements = document.querySelectorAll("audio");

audioElements.forEach(audio => {
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);

    audio.onplay = () => audioContext.resume();
});