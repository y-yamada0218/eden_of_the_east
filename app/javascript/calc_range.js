(function() {
  //ユーザの現在地からメッセージの座標までの距離を計算
  function searchRange(messagePosition,MyPosition) { 
    lat1 = parseFloat(messagePosition[0]);
    lng1 = parseFloat(messagePosition[1]);
    lat2 = MyPosition[0];
    lng2 = MyPosition[1];

    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;
    
    range = 6371 * 
            Math.acos(Math.cos(lat1) * 
            Math.cos(lat2) * 
            Math.cos(lng2 - lng1) + 
            Math.sin(lat1) * 
            Math.sin(lat2));
    range = range * 10000;
    range = Math.round(range);
    range = range / 10000;
    return range 
  }

  //関数をグローバル変数にする
  window = window|| {};
  window.searchRange = searchRange;
})();
