let branchID ="";

// 拠点番号の入力
$(".branch_id_btn").click(function(){
  var flag = 0;

  // 半角数字で入力されているかチェック
  if ($(".branch_Num_Input").val().match(/[^0-9]+/)){ 
      flag = 1;
  }
  console.log(flag,"flagの数字");

  if(flag == 1 ){ // 半角数字で入力されていない場合
      alert('半角数字のみ入力できます');
      return false;
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

// すべてクリアボタンを押したときの処理
$('.allClear').on("click", function(){
  $('.branch_id_view').text('');
  $('.branch_Num_Input').val('');
  $('.filename').text('ファイル名');
  $('.result_fileName').text('OK/NG');
  $('.cell_2').text('');
  $('.cell_3').text('');
});


// クリアボタンが押されたときの処理
$('.fileClear').on("click", function(){
  //input,ファイル選択をリセット
  let table = $(this).siblings('.table');
  $(this).siblings('.file_reader_input').val('');
  table.find('.filename').text('ファイルが未選択です'); 
  table.find('.result_fileName').text('OK/NG'); 

  function result_delete(context){
    let sibling = $(context).siblings('.file_reader_input');
    if(sibling.hasClass("no1")){
      $('.result_no1-1').text(''); 
      $('.result_no1-2').text(''); 
      $('.result_no1-3').text(''); 

    }else if(sibling.hasClass("no2")){
      $('.result_no2-1').text(''); 

    }else if(sibling.hasClass("no3")){
      $('.result_no3-1').text(''); 

    }else if(sibling.hasClass("no4")){
      $('.result_no4-1').text(''); 
      $('.result_no4-2').text(''); 
      $('.result_no4-3').text(''); 
      $('.result_no4-4').text(''); 
      $('.result_no4-5').text(''); 

    }else if(sibling.hasClass("no5")){
      $('.result_no5-1').text(''); 
      $('.result_no5-2').text(''); 
    }
  }

  result_delete(this);
});


// テキストファイルを選択ボタンを押したら
$('.file_reader_input').change(function (){
  let file = this.files[0];
  console.log(file);
  //ファイル読み込み
  let reader = new FileReader();
  reader.readAsText(file);
  //ファイルの情報を代入(file.name=ファイル名)
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
    return;
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
      } else if(!finalResult.includes('22') && finalResult.includes('23')){
        $('.result_no1-2').text("NG");
        $('.result_no1-3').text("OK");
      } else if(finalResult.includes('22') && !finalResult.includes('23')){
        $('.result_no1-2').text("OK");
        $('.result_no1-3').text("NG");
      } else{
        $('.result_no1-2').text("NG");
        $('.result_no1-3').text("NG");
      }


      
    
  // 2.エージング確認
    }else if($(this_input).hasClass("no2")){
      let result2 = reader.result;
      console.log(result2);

      let keyword2_1 = '------ show uptime ------';
      let keyword2_2 = '------ show version ------';
      let keyword2_3 = 'System uptime is ';
      let keyword2_4 = 'System woke up by reload';

      let parts2_1 = result2.split(keyword2_1);
      let parts2_2 = parts2_1[1].split(keyword2_2);
      let show_uptime = parts2_2[0];

      console.log(show_uptime);

      let start_ut = (show_uptime.indexOf(keyword2_3)) + 17;
      let end_ut = show_uptime.indexOf(keyword2_4);
      let result_ut = show_uptime.substring(start_ut, end_ut);
      console.log(result_ut);
      $('.result_no2-1').text(result_ut);



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

  // 4.ポートチェック確認
    }else if($(this_input).hasClass("no4")){
      let result4 = reader.result;
      console.log(result4);

      let keyword4_1 = 'Link status up for port 0, 1G b/s, GigaEthernet0';
      let keyword4_2 = 'Link status down for port 0, GigaEthernet0';
      let keyword4_3 = 'Link status up for port 1, 1G b/s, GigaEthernet1';
      let keyword4_4 = 'Link status down for port 1, GigaEthernet1';
      let keyword4_5 = 'Link status up for port 2, 1G b/s, GigaEthernet1';
      let keyword4_6 = 'Link status down for port 2, GigaEthernet1';
      let keyword4_7 = 'Link status up for port 3, 1G b/s, GigaEthernet1';
      let keyword4_8 = 'Link status down for port 3, GigaEthernet1';
      let keyword4_9 = 'Link status up for port 4, 1G b/s, GigaEthernet1';
      let keyword4_10 = 'Link status down for port 4, GigaEthernet1';

      let r4_1 = result4.indexOf(keyword4_1);
      let r4_2 = result4.indexOf(keyword4_2);
      let r4_3 = result4.indexOf(keyword4_3);
      let r4_4 = result4.indexOf(keyword4_4);
      let r4_5 = result4.indexOf(keyword4_5);
      let r4_6 = result4.indexOf(keyword4_6);
      let r4_7 = result4.indexOf(keyword4_7);
      let r4_8 = result4.indexOf(keyword4_8);
      let r4_9 = result4.indexOf(keyword4_9);
      let r4_10 = result4.indexOf(keyword4_10);

      
      if(r4_1==-1 || r4_2==-1){
        $('.result_no4-1').text("NG");
      }else{
        $('.result_no4-1').text("OK");
      }

      if(r4_3==-1 || r4_4==-1){
        $('.result_no4-2').text("NG");
      }else{
        $('.result_no4-2').text("OK");
      }

      if(r4_5==-1 || r4_6==-1){
        $('.result_no4-3').text("NG");
      }else{
        $('.result_no4-3').text("OK");
      }

      if(r4_7==-1 || r4_8==-1){
        $('.result_no4-4').text("NG");
      }else{
        $('.result_no4-4').text("OK");
      }

      if(r4_9==-1 || r4_10==-1){
        $('.result_no4-5').text("NG");
      }else{
        $('.result_no4-5').text("OK");
      }
  
  // 5.起動確認
    }else if($(this_input).hasClass("no5")){
      let result5 = reader.result;
      console.log(result5);

      let keyword5_1 = 'show version';
      let keyword5_2 = 'Version 9.7.54M';
      let keyword5_3 = 'S/N:';

      // keyword1により文章を2つにわける
      let parts5_1 = result5.split(keyword5_1);

      let start_ver = parts5_1[1].indexOf(keyword5_2);
      let end_ver = start_ver + 15;
      let result_ver = parts5_1[1].substring(start_ver, end_ver);
      console.log(result_ver);
      $('.result_no5-1').text(result_ver);
      

      let start_sn = (parts5_1[1].indexOf(keyword5_3)) + 5;
      let end_sn = start_sn + 12;
      console.log(end_sn)
      let result_sn = parts5_1[1].substring(start_sn, end_sn);
      console.log(result_sn);
      $('.result_no5-2').text(result_sn);

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


