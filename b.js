d3.select("#result")    // ID名resultの要素を指定
    .append("svg")  // svg要素を追加
    .attr("width", 320) // svg要素の横幅を指定
    .attr("height", 240)    // svg要素の縦幅を指定
    .append("rect") // 四角形（矩形）を追加。以後のメソッドは、この四角形（矩形）に対しての設定になる
    .attr("x", 80)  // x座標を指定
    .attr("y", 60)  // y座標を指定
    .attr("width", 100) // 横幅を指定
    .attr("height", 100)    // 縦幅を指定
    .attr("stroke", "blue") // 青色にする
    .attr("fill", "cyan")   // 塗りは水色にする
    .attr("stroke-width", 2)    // 線幅を指定