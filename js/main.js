
$(".branch_id_btn").click(function(){
  var flag = 0;

  // 半角数字で入力されているかチェック
  if ($(".branch_Num_Input").val().match(/[^0-9]+/)){ // 半角数字で入力されていない場合
      flag = 1;
  }
  console.log(flag,"flagの数字");

  if(flag == 1 ){ // 半角数字で入力されていない場合
      window.alert('半角数字のみ入力できます'); // アラートを表示
      return false; // 送信中止
  }else{ // 半角数字で入力されている場合
    var x = $(".branch_Num_Input").val();
    console.log(x,"xの中身");
    $(".branch_id_view").text(x);
  }
});

$('.file_reader_input').change(function (){
  let file = this.files[0];
  //読み込み
  let reader = new FileReader();
  reader.readAsText(file);

  //読み込み後
  reader.onload = function  () {
    let result = reader.result;
    
    // キーワード「xxx」以降のテキストを抽出
    let keyword1 = 'SYN arrived interface GigaEthernet1.0';
    // keyword1により文章を2つにわける
    let parts1 = result.split(keyword1);
    // 文章が２つに分かれていた場合
    if (parts1.length == 2) {
      // 結果にOKを返す
      $('.result_no1').text("OK");
    } else {
      // 結果にNGを返す
      $('.result_no1').text("NG");
    }
  };
});




$('#getfile').change(function (){
  var file = this.files[0];
  //読み込み
  var reader = new FileReader();
  reader.readAsText(file);

  //読み込み後
  reader.onload = function  () {
    var result = reader.result;
    
    // キーワード「xxx」以降のテキストを抽出
    var keyword1 = '-------------------- show uptime --------------------';
    var parts1 = result.split(keyword1);
    if (parts1.length > 1) {
      // キーワード「yyy」以前のテキストを抽出
      var keyword2 = '-------------------- show version --------------------';
      var parts2 = parts1[1].split(keyword2);
      if (parts2.length > 0) {
        $('#preview').text(parts2[0]);
      } else {
        // キーワードが見つからなかった場合は、ファイル全体を表示
        $('#preview').text("異なるファイルを読み込んでいます");
      }
    } else {
      // キーワードが見つからなかった場合は、ファイル全体を表示
      $('#preview').text("異なるファイルを読み込んでいます");
    }
  };
});

