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


  let this_input = this;
  
  reader.onload = function  () {

  // 1.SSH_Telnet接続確認
    if($(this_input).hasClass("no1")){
      let result1 = reader.result;
      console.log(result1);

      let keyword1_1 = 'SYN arrived interface GigaEthernet1.0';
      let keyword1_2 = "ESTABLISHED";
      // keyword1により文章を2つにわける
      let parts1_1 = result1.split(keyword1_1);
      // 文章が２つに分かれていた場合
      if (parts1_1.length == 2) {
        // 結果にOKを返す
        $('.result_no1-1').text("OK");
      } else {
        // 結果にNGを返す
        $('.result_no1-1').text("NG");
      }
      // keyword1_2の位置を取得(indexOfメソッド)
      let keywordIndex = result1.indexOf(keyword1_2);
      let finalResult = [];
      // keyword1_2が見つかった場合のwhile文
      while (keywordIndex >= 0) { 
        let start = keywordIndex - 14
        let end = keywordIndex - 12
         // 文字列を切り出す
        let result = result1.substring(start, end);
        console.log(result,"keyword取得結果、２２，２３想定"); 
        // 次のキーワードの位置を取得
        keywordIndex = result1.indexOf(keyword1_2, keywordIndex + 1); 
        finalResult.push(result);
      }
      if(finalResult.includes('22') && finalResult.includes('23')) {
        $('.result_no1-2').text("OK");
        $('.result_no1-3').text("OK");
      } else {
        $('.result_no1-2').text("NG");
        $('.result_no1-3').text("NG");
      }
      
    
  // 2.エージング確認
    }else if($(this_input).hasClass("no2")){
      let result2 = reader.result;
      console.log(result2);

  // 3.キッティング後ログ確認
    }else if($(this_input).hasClass("no3")){
      let result3 = reader.result;
      console.log(result3);

      let keyword3_1 = 'show flash';
      let keyword3_2 = 'SYSTEM-PRIVATE-KEY';

      // keyword1により文章を2つにわける
      let parts3_1 = result3.split(keyword3_1);
      console.log(parts3_1);
      console.log(parts3_1[1]);

      let parts3_2 = parts3_1[1].split(keyword3_2);
      console.log(parts3_2);

      // 文章が２つに分かれていた場合
      if (parts3_2.length == 2) {
        // 結果にOKを返す
        $('.result_no3-1').text("OK");
      } else {
        // 結果にNGを返す
        $('.result_no3-1').text("NG");
      }


    }else if($(this_input).hasClass("no4")){
      let result4 = reader.result;
      console.log(result4);

    }else if($(this_input).hasClass("no5")){
      let result5 = reader.result;
      console.log(result5);

      let keyword5_1 = 'show version';
      let keyword5_2 = 'Version 9.7.54M';
      let keyword5_3 = 'S/N:';

      // keyword1により文章を2つにわける
      let parts5_1 = result5.split(keyword5_1);
      let parts5_2 = parts5_1[1].split(keyword5_2);
      let parts5_3 = parts5_2[1].split(keyword5_3);

      let start_ver = part5_2.indexOf(keyword5_2);
      let end_ver = ;

      let result_ver = result1.substring(start, end);

      // Verの取得
      if (parts5_2.length == 2) {
        // 結果にOKを返す
        $('.result_no3-1').text("OK");
      } else {
        // 結果にNGを返す
        $('.result_no3-1').text("NG");
      }





    }
  }
});



  //読み込み後のkeywordチェック
//   reader.onload = function  () {
//     let result = reader.result;
//     // キーワード以降のテキストを抽出
//     let keyword1 = 'SYN arrived interface GigaEthernet1.0';
//     // keyword1により文章を2つにわける
//     let parts1 = result.split(keyword1);
//     // 文章が２つに分かれていた場合
//     if (parts1.length == 2) {
//       // 結果にOKを返す
//       $('.result_no1-1').text("OK");
//     } else {
//       // 結果にNGを返す
//       $('.result_no1-1').text("NG");
//     }
//   };

// });



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


