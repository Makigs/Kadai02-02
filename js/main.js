let branchID ="";

// 拠点番号の入力
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
    branchID = $(".branch_Num_Input").val();
    console.log(branchID,"拠点番号");
    $(".branch_id_view").text(branchID);
  }
});

// fileSelectボタンを押したらfile_reader_inputが発火する
$(".fileSelect").on("click", function(){
  const reader = $(this).siblings(".file_reader_input");
  if (reader.length) {
    reader.click();
  }
});




// クリアボタンが押されたときの処理
$('.fileClear').on("click", function(){
  //input,ファイル選択をリセット
  let table = $(this).siblings('.table');
  $(this).siblings('.file_reader_input').val('');
  table.find('.filename').text('ファイルが未選択です'); 
  table.find('.result_fileName').text('OK/NG'); 
});


// テキストファイルを選択ボタンを押したら
$('.file_reader_input').change(function (){
  let file = this.files[0];
  console.log(file);
  //ファイル読み込み
  let reader = new FileReader();
  reader.readAsText(file);
  //ファイルの情報を代入(file.name=ファイル名/file.size=ファイルサイズ/file.type=ファイルタイプ)
  let fileInfo = $(this).prop('files')[0];
  let fileName = fileInfo.name
  let fileName_write = $(this).siblings('.table').find('.filename')
  fileName_write.text(fileName); 


  // ファイル名チェックのためのチェックワード関数を定義
  function fileName_check(context){
    let checkWord;
    if($(context).hasClass("no1")){
      checkWord = "SSH・Telnet接続確認";
    }else if($(context).hasClass("no2")){
      checkWord = "エージング";
    }else if($(context).hasClass("no3")){
      checkWord = "キッティング後ログ";
    }else if($(context).hasClass("no4")){
      checkWord = "ポートチェック";
    }else if($(context).hasClass("no5")){
      checkWord = "起動確認";
    }
    return checkWord;
  }


  // ファイル名の結果を表示
  let fileName_result = $(this).siblings('.table').find('.result_fileName')
  let word = fileName_check(this);
  console.log(word,"wordに入ってるもの");
  if(fileName.includes(branchID) && fileName.includes(word)){
    fileName_result.text("OK");
  } else {
    // 結果にNGを返す
    fileName_result.text("NG");
  }





  //読み込み後のkeywordチェック
  reader.onload = function  () {
    let result = reader.result;
    // キーワード以降のテキストを抽出
    let keyword1 = 'SYN arrived interface GigaEthernet1.0';
    // keyword1により文章を2つにわける
    let parts1 = result.split(keyword1);
    // 文章が２つに分かれていた場合
    if (parts1.length == 2) {
      // 結果にOKを返す
      $('.result_no1-1').text("OK");
    } else {
      // 結果にNGを返す
      $('.result_no1-1').text("NG");
    }
  };

});



// test記載
// $('#getfile').change(function (){
//   var file = this.files[0];
//   //読み込み
//   var reader = new FileReader();
//   reader.readAsText(file);

//   //読み込み後
//   reader.onload = function  () {
//     var result = reader.result;
    
//     // キーワード「xxx」以降のテキストを抽出
//     var keyword1 = '-------------------- show uptime --------------------';
//     var parts1 = result.split(keyword1);
//     if (parts1.length > 1) {
//       // キーワード「yyy」以前のテキストを抽出
//       var keyword2 = '-------------------- show version --------------------';
//       var parts2 = parts1[1].split(keyword2);
//       if (parts2.length > 0) {
//         $('#preview').text(parts2[0]);
//       } else {
//         // キーワードが見つからなかった場合は、ファイル全体を表示
//         $('#preview').text("異なるファイルを読み込んでいます");
//       }
//     } else {
//       // キーワードが見つからなかった場合は、ファイル全体を表示
//       $('#preview').text("異なるファイルを読み込んでいます");
//     }
//   };
// });


// 試しコード
// function handleFileChange(e) {
//   let file = e.target.files[0];
//   console.log(file);

//   // ファイルの読み込み
//   readFile(file);

//   // ファイル情報を取得
//   let fileInfo = getFileInfo(file);
  
//   // ファイル名チェック
//   checkFileName(fileInfo.name);
// }

// function readFile(file) {
//   let reader = new FileReader();
//   reader.onload = function  () {
//     checkKeyword(reader.result);
//   };
//   reader.readAsText(file);
// }

// function getFileInfo(file) {
//   let fileInfo = file;
//   let fileName = fileInfo.name;
//   $('.filename').text(fileName);
//   return fileInfo;
// }

// function checkFileName(fileName) {
//   if(fileName.includes(branchID) && fileName.includes("SSH・Telnet接続確認")){
//     console.log(branchID, "拠点番号2");
//     $('.result_fileName').text("OK");
//   } else {
//     console.log(branchID, "拠点番号3");
//     $('.result_fileName').text("NG");
//   }
// }

// function checkKeyword(result) {
//   let keyword1 = 'SYN arrived interface GigaEthernet1.0';
//   let parts1 = result.split(keyword1);
//   if (parts1.length == 2) {
//     $('.result_no1').text("OK");
//   } else {
//     $('.result_no1').text("NG");
//   }
// }

// $('.file_reader_input').change(handleFileChange);


