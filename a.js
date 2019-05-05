const context = new AudioContext()

// サウンドを再生
const playSound = (buffer) => {
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    source.start(0)
}

var synth = new Tone.Synth().toMaster();
// C5(音程)を4分音符で鳴らす


// サウンドデータを読み込んでクリックイベントを設定
const getAudioBuffer = () => {
    const request = new XMLHttpRequest()
    request.responseType = "arraybuffer"
    request.onload = () => {
        context.decodeAudioData(request.response, (buffer) => (document.getElementById("play-button").onclick = () =>
            synth.triggerAttackRelease('C5', '4n')))
    }

    request.open("GET", "foo.mp3", true)
    request.send("")
}

window.onload = () => getAudioBuffer();