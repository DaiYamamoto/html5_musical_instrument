
let svg = d3.select("#result").append("svg")  ;

function createWhiteRectangle(x, y, id) {
    svg.append("rect") // 四角形（矩形）を追加。以後のメソッドは、この四角形（矩形）に対しての設定になる
        .attr('id', id)
        .attr("x", x)  // x座標を指定
        .attr("y", y)  // y座標を指定
        .attr("width", 80) // 横幅を指定
        .attr("height", 140)    // 縦幅を指定
        .attr("stroke", "blue") // 青色にする
        .attr("fill", "#e7e9df")   // 塗りは水色にする
        .attr("stroke-width", 2)    // 線幅を指定
}

function createBlackRectangle(x,y,id) {
    svg.append("rect") // 四角形（矩形）を追加。以後のメソッドは、この四角形（矩形）に対しての設定になる
        .attr('id', id)
        .attr("x", x)  // x座標を指定
        .attr("y", y)  // y座標を指定
        .attr("width", 80) // 横幅を指定
        .attr("height", 140)    // 縦幅を指定
        .attr("stroke", "blue") // 青色にする
        .attr("fill", "#081745")   // 塗りは水色にする
        .attr("stroke-width", 2)    // 線幅を指定
}

function main(){
    svg.attr("width", 800).attr("height", 400);
    for(let i=0; i<7; i++){
        createWhiteRectangle(40 + i*100, 200,idWrap(i));
    }
    for(let i=0; i<5; i++) {
        let x = i < 2 ? 90+ i*100 : 90 + i * 100 + 100;
        createBlackRectangle(x, 40,idWrap(i+100))
    }

    $("rect").click(function () {
      //  synth.triggerAttackRelease('C5', '4n');
        console.log(23)
        const id = $(this).attr('id');

        playSound(id)
    });
    initSelect();
}

function idWrap(i) {
    return i+1;
}

const synth = new Tone.Synth().toMaster();

const C_MAJOR = { 1: 'C5', 2: 'D5', 3:'E5',4:'F5',5:'G5',6:'A5',7:'B5',
    101: 'C#5',102: 'D#5',103: 'F#5',104: 'G#5',105: 'A#5',
};
const D_MAJOR = {1: 'D5', 2: 'E5', 3:'F#5',4:'G5',5:'A5',6:'B5',7:'C#6',
    101: 'D#5',102: 'E#5',103: 'G#5',104: 'A#5',105: 'B#5',
};
let mapData = C_MAJOR;
function playSound(id) {
    console.log(mapData[id]);
    synth.triggerAttackRelease(mapData[id], '4n');
}

main();

function initSelect() {
    $('#select').change(function () {
        const val = $(this).val();
        console.log(val);
        if(val === 'c_major') mapData = C_MAJOR;
        if(val === 'd_major') mapData = D_MAJOR;
    })
}