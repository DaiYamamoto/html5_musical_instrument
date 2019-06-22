
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
    setScale(s){
        this.list = Oto.init(s);
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
        for(let i=0;i<12 *octave;i++ ) Main.createKey(i);

        this.oto = new Oto('c_major');

        let oto_ = this.oto;
        $("rect").click(function () {
            const id = $(this).attr('id');
            console.log(id);
            oto_.playSound(id);
        });
        $('#select').change(function () {
            const val = $(this).val();
            console.log(val);
            oto_.setScale(val);
        });
        $('#octave').change(function () {
            const val = $(this).val();
            oto_.setOct(parseInt(val, 10));
        });
        $('#position').change(function () {
            const val0 = $(this).val();
            d3.select('#result').selectAll("svg").remove();
            svg = d3.select("#result").append("svg");
            svg.attr("width", 800*octave).attr("height", 400);
            for(let i=0;i<12 *octave;i++ ) Main.createKey(i,parseInt(val0, 10));
            $("rect").click(function () {
                const id = $(this).attr('id');
                console.log(id);
                oto_.playSound(id);
            });
            $('#select').change(function () {
                const val = $(this).val();
                console.log(val);
                oto_.setScale(val);
            });
            $('#octave').change(function () {
                const val = $(this).val();
                oto_.setOct(parseInt(val, 10));
            });
        })
    }

    static createKey(num, position = 0) {
        let pos =0;
        let note = num;
        if(position<0){
            num = 12 + num + position ;
            if(Main.WHITE_KEY.indexOf(12 + position) !== -1) pos = Main.WHITE_KEY.indexOf(12 + position) ;
            if(Main.BLACK_KEY.indexOf(12 + position) !== -1) pos = Main.BLACK_KEY.indexOf(12 + position) ;
            note = num - 12;
        }
        const key = num % 12;
        const oct = Math.floor(num/12) ;

        if (Main.WHITE_KEY.includes(key)) {
            let index = Main.WHITE_KEY.indexOf(key);
            createWhiteRectangle(40 + (index + oct*7 - pos)* 100 , 200, note);
        }
        if (Main.BLACK_KEY.includes(key)) {
            let index = Main.BLACK_KEY.indexOf(key);
            createBlackRectangle(90 + (index + oct*7 - pos) * 100 , 40, note)
        }
    }

    static get WHITE_KEY(){return [0,2,4,5,7,9,11]; }
    static get BLACK_KEY(){return [1,3,999,6,8,10]; } //999 is dummy.

    getOto(){return this.oto}
}

const main = new Main();
const kET_TO_ID = {'a':-1,'s': 0, 'e':1, 'd':2, 'r':3, 'f':4, 'g':5, 'y':6,'h':7,'u':8,'j':9,'i':10,'k':11,'l':12};
function key_press() {
    main.getOto().playSound( kET_TO_ID[event.key]  );
  }