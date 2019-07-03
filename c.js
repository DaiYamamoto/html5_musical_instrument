var svg = d3.select("#result").append("svg");
function createWhiteRectangle(x, y, id) {
    svg.append("rect") // 四角形（矩形）を追加。以後のメソッドは、この四角形（矩形）に対しての設定になる
        .attr('id', id)
        .attr("x", x) // x座標を指定
        .attr("y", y) // y座標を指定
        .attr("width", 80) // 横幅を指定
        .attr("height", 140) // 縦幅を指定
        .attr("stroke", "blue") // 青色にする
        .attr("fill", "#e7e9df") // 塗りは水色にする
        .attr("stroke-width", 2); // 線幅を指定
}
function createBlackRectangle(x, y, id) {
    svg.append("rect") // 四角形（矩形）を追加。以後のメソッドは、この四角形（矩形）に対しての設定になる
        .attr('id', id)
        .attr("x", x) // x座標を指定
        .attr("y", y) // y座標を指定
        .attr("width", 80) // 横幅を指定
        .attr("height", 140) // 縦幅を指定
        .attr("stroke", "blue") // 青色にする
        .attr("fill", "#081745") // 塗りは水色にする
        .attr("stroke-width", 2); // 線幅を指定
}
var SYNTH = new Tone.Synth().toMaster();
var Oto = /** @class */ (function () {
    function Oto(scaleName) {
        this.list = Oto.init(scaleName);
        this.oct = 4;
    }
    Oto.init = function (scaleName) {
        var scale = [];
        scale[0] = Oto.FIRST_NOTE[scaleName];
        for (var i = 0; i < 12 * 7; i++) {
            scale[i + 1] = Oto.raiseHalf(scale[i]);
        }
        return scale;
    };
    Oto.raiseHalf = function (moji) {
        var key = moji.substr(0, 1);
        var oct = moji.slice(-1);
        var len = moji.length;
        if (len === 2) {
            var f = key === 'C' || key === 'D' || key === 'F' || key === 'G' || key === 'A';
            if (f)
                return key + "#" + oct;
            if (key === 'E')
                return 'F' + oct;
            if ('B' === key)
                return 'C' + (parseInt(oct, 10) + 1);
        }
        if (len === 3) {
            var f = key === 'C' || key === 'D' || key === 'F' || key === 'A';
            if (f) {
                var codeNum = key.charCodeAt(0);
                return String.fromCharCode(codeNum + 1) + oct;
            }
            if ('G' === key)
                return 'A' + oct;
        }
    };
    Oto.prototype.setScale = function (s) {
        this.list = Oto.init(s);
    };
    Oto.prototype.setOct = function (n) {
        this.oct = n - 1;
    };
    Oto.prototype.playSound = function (id) {
        var absId = parseInt(id, 10) + this.oct * 12;
        var note = this.list[absId];
        SYNTH.triggerAttack(note);
    };
    Oto.stopSound = function () {
        SYNTH.triggerRelease();
    };
    Oto.FIRST_NOTE = { 'c_major': 'C1', 'd_major': 'D1', 'e_major': 'E1', 'f_major': 'F1', 'g_major': 'G1', 'a_major': 'A1', 'b_major': 'B1' };
    return Oto;
}());
var Main = /** @class */ (function () {
    function Main() {
        var oto = new Oto('c_major');
        this.oto = oto;
        var createKeyboard_ = this.createKeyboard;
        createKeyboard_(oto);
        $('#position').change(function () {
            d3.select('#result').selectAll("svg").remove();
            svg = d3.select("#result").append("svg");
            svg.attr("width", 800 * 2).attr("height", 400);
            var pos = Number($(this).val());
            createKeyboard_(oto, pos);
        });
    }
    Main.prototype.createKeyboard = function (oto, position) {
        if (position === void 0) { position = 0; }
        var octave = 2; // number of keys on keyboard
        svg.attr("width", 800 * octave).attr("height", 400);
        for (var i = 0; i < 12 * octave; i++)
            Main.createKey(i, position);
        var rect = $("rect");
        rect.mousedown(function () {
            var id = $(this).attr('id');
            oto.playSound(id);
        });
        rect.mouseup(function () {
            Oto.stopSound();
        });
        $('#select').change(function () {
            var val = $(this).val();
            oto.setScale(val);
        });
        $('#octave').change(function () {
            var val = Number($(this).val());
            oto.setOct(val);
        });
    };
    Main.createKey = function (num, position) {
        if (position === void 0) { position = 0; }
        var pos = 0;
        var note = num;
        if (position < 0) {
            num = 12 + num + position;
            if (Main.WHITE_KEY.indexOf(12 + position) !== -1)
                pos = Main.WHITE_KEY.indexOf(12 + position);
            if (Main.BLACK_KEY.indexOf(12 + position) !== -1)
                pos = Main.BLACK_KEY.indexOf(12 + position);
            note = num - 12;
        }
        var key = num % 12;
        var oct = Math.floor(num / 12);
        if (Main.WHITE_KEY.includes(key)) {
            var index = Main.WHITE_KEY.indexOf(key);
            createWhiteRectangle(40 + (index + oct * 7 - pos) * 100, 200, note);
        }
        if (Main.BLACK_KEY.includes(key)) {
            var index = Main.BLACK_KEY.indexOf(key);
            createBlackRectangle(90 + (index + oct * 7 - pos) * 100, 40, note);
        }
    };
    Main.prototype.getOto = function () { return this.oto; };
    Main.WHITE_KEY = [0, 2, 4, 5, 7, 9, 11];
    Main.BLACK_KEY = [1, 3, 999, 6, 8, 10]; //999 is dummy.
    return Main;
}());
var main = new Main();
var kET_TO_ID = { 'a': -1, 's': 0, 'e': 1, 'd': 2, 'r': 3, 'f': 4, 'g': 5, 'y': 6, 'h': 7, 'u': 8, 'j': 9, 'i': 10, 'k': 11, 'l': 12 };
function keyDown() {
    main.getOto().playSound(kET_TO_ID[event.key]);
}
function keyUp() {
    Oto.stopSound();
}
