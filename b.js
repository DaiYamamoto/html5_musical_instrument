
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


const SYNTH = new Tone.Synth().toMaster();

class Oto{
    constructor(scaleName){
        this.list = Oto.init(scaleName);
        this.oct  = 4;
    }
    static init(scaleName){
        const scale = [];
        scale[0] =  Oto.FIRST_NOTE[scaleName];
        for(let i =0;i<12*7;i++) {
            scale[i + 1] = Oto.raiseHalf(scale[i]);
        }
        return scale;
    }
    static raiseHalf(moji){
        let key = moji.substr(0,1)
        let oct = moji.slice(-1)
        let len = moji.length;

        if( len === 2){
            let f = key === 'C' || key === 'D' || key === 'F' || key === 'G' || key === 'A' ;

            if (f) return key + "#" + oct;
            if( key === 'E') return 'F' + oct;

            if ('B' ===key ) return 'C' +  ( parseInt(oct,10) + 1) ;
        }
        if (len === 3){
            let f = key === 'C' || key === 'D' || key === 'F' || key === 'A';
            if(f) {
                let codeNum = key.charCodeAt(0)
                return  String.fromCharCode(codeNum + 1) + oct;
            }

            if( 'G' === key)   return 'A' + oct ;
        }
    }
    setOct(n){
        this.oct = n - 1;
    }
    playSound(id){
        let absId =  parseInt(id, 10)  + this.oct * 12;
        let note = this.list[absId];
        SYNTH.triggerAttackRelease(note, '4n');
    }
    static get FIRST_NOTE(){ return { 'c_major': 'C1','d_major': 'D1'} };
}

class Main{
    constructor(){
        const octave = 2; // number of keys on keyboard
        svg.attr("width", 800*octave).attr("height", 400);
        for(let i=0;i<12;i++ ) this.createKey(i);

        this.oto = new Oto('c_major');
        $("rect").click(function () {
            const id = $(this).attr('id');
            this.oto.playSound(id);
        });
        this.initSelect();
    }

    createKey(num) {
        if (Main.WHITE_KEY.includes(num)) {
            let index = Main.WHITE_KEY.indexOf(num);
            createWhiteRectangle(40 + index * 100, 200, num);
        }
        if (Main.BLACK_KEY.includes(num)) {
            let index = Main.BLACK_KEY.indexOf(num);
            createBlackRectangle(90 + index * 100, 40, num)
        }
    }
    initSelect() {
        $('#select').change(function () {
            const val = $(this).val();
            console.log(val);
            this.oto = new Oto(val);
        })
    }
    static get WHITE_KEY(){return [0,2,4,5,7,9,11]; }
    static get BLACK_KEY(){return [1,3,999,6,8,10]; } //999 is dummy.
}

const main = new Main();