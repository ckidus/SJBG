function toggleMid_spacingInput() {
  var Mid_spacingInput = document.getElementById("Mid_spacingInput");
  var Mid_spacingCheckbox = document.getElementById("Mid_spacingCheckbox");
  
  if (Mid_spacingCheckbox.checked) {
    Mid_spacingInput.style.display = "block";
  } else {
    Mid_spacingInput.style.display = "none";
  }
}

function drawRectangleLines(context, rectTopX, dataY, xLength,centerX) {
  context.beginPath();
  // 가로선
  context.moveTo(rectTopX, dataY + 30); // 시작점
  context.lineTo(rectTopX + xLength, dataY + 30); // 끝점

  // 왼쪽선
  context.moveTo(rectTopX, dataY); // 시작점
  context.lineTo(rectTopX, dataY + 30); // 끝점

  // 오른쪽선
  context.moveTo(rectTopX + xLength, dataY); // 시작점
  context.lineTo(rectTopX + xLength, dataY + 30); // 끝점

  context.strokeStyle = "black";
  context.stroke();
  context.closePath();

  context.font = "15px Arial";
  context.fillStyle = "black";
  context.fillText(xLength, centerX-10, dataY+45); // x폭 표시
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function resizeCanvas() {
  // 윈도우 크기에 맞게 캔버스 크기 조절
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 새로운 캔버스 크기에 맞게 작업 수행
  drawCanvas();
}

function drawCanvas() {
  //var xLength = parseInt(document.getElementById("xLengthInput").value);
  //var circleCount = parseInt(document.getElementById("circleCountInput").value);
  //var diameter = parseInt(document.getElementById("diameterInput").value);
  //var Hori_spacing = parseInt(document.getElementById("Hori_spacingInput").value);
  //var Vert_spacing = parseInt(document.getElementById("Vert_spacingInput").value);

  //테스트용으로 폭 100 디폴트
  var xLength = 100;
  var circleCount = 4;
  var diameter = 5;
  var Hori_spacing = 20;
  var Vert_spacing = 20;

  var Mid_spacingVal = parseInt(document.getElementById("Mid_spacingInput").value); //가운데 다를때

  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  context.fillStyle = "white"; // 배경색을 흰색으로 설정
  context.fillRect(0, 0, canvas.width, canvas.height); // 캔버스 전체를 흰색으로 채움

  var centerX = canvas.width / 2; // 사각형 가운데 x 좌표

  var rectTopX = centerX - xLength / 2;
  var rectTopY = canvas.height -200 - xLength * 2.5;
  var rectBotY = canvas.height-200;
  var rectlenX = xLength;
  var rectlenY = xLength * 2.5;

  var Letterplus = Hori_spacing/2;
  
  var currentX = centerX;
  var currentY = rectBotY - diameter;

  var RowCircleCount = xLength * 2.5 / Vert_spacing;

  var FirstRowY = rectBotY - diameter;
  var dataY = rectBotY + 10;
  var circles = [];

  if (isNaN(Mid_spacingVal)) {
    Mid_spacingVal = 0; // NaN일 경우 0으로 설정
  }

  console.log(Mid_spacingVal);

  if (Mid_spacingVal !== "") { // Mid_spacingVal 값이 비어있지 않으면
    // 여기에 조건문 내용 추가
    var Mid_spacing = Mid_spacingVal / 2;
  }
  console.log(Mid_spacing);

  if(Hori_spacing < 30){
    Letterplus = 0;
  } else{
    Letterplus = Hori_spacing*2/5;
  }

  // Draw Rectangle
  context.fillStyle = "black"; // 사각형의 색상
  context.strokeRect(rectTopX, rectTopY, rectlenX, rectlenY);

  if (circleCount % 2 === 0){ //짝수

    currentX = centerX + Mid_spacing + Hori_spacing/2;

    for (let i = 1; i < RowCircleCount; i++) {
      for (let j = 0; j < circleCount/2; j++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX += Hori_spacing;
      }
      currentX = centerX - Mid_spacing -Hori_spacing/2;

      for (let k = 1; k <= circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX + Mid_spacing + Hori_spacing/2;
      currentY -= Vert_spacing;
    }

    // 길이 표기

    rightCircleValue = circleCount/2-1;
    LeftCircleValue = circleCount-1;
  
    //좌우 길이 표시
    context.beginPath();
    context.moveTo(circles[rightCircleValue] , dataY);
    context.lineTo(circles[LeftCircleValue] , dataY);
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    //전체 폭 표시
    drawRectangleLines(context, rectTopX, dataY, xLength,centerX);


    for (let l = 0; l < circleCount; l++) {
      
      //위아래 길이 표시
  
      context.beginPath();
      context.moveTo(circles[l] , FirstRowY);
      context.lineTo(circles[l] , dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();
      }
    
    for (let o = 0; o < circleCount-1 ; o++) {
      if( o < circleCount/2-1) {

      //오른쪽 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o]+Letterplus, dataY+20);

      } else if (o === circleCount/2-1) {

      //가운데 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[0];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o+1]+Mid_spacing+Letterplus, dataY+20);
      } else {

      //왼쪽 원 사이에 거리 표시
      const distanceleft = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceleft)}`, circles[o]+Letterplus + distanceleft, dataY+20);
      }
    }
  } else {  //홀수
    for (let i = 1; i < RowCircleCount; i++) {
      currentX = centerX + Mid_spacing + Hori_spacing/2;
      for (let j = 0; j < circleCount/2; j++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX += Hori_spacing;
      }
      currentX = centerX - Mid_spacing -Hori_spacing;

      for (let k = 1; k < circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX + Mid_spacing;
      currentY -= Vert_spacing;
    }

    //길이 표기 

    rightCircleValue = (circleCount-1)/2;
    LeftCircleValue = circleCount-1;
  
    //좌우 길이 선
    context.beginPath();
    context.moveTo(circles[rightCircleValue] , dataY);
    context.lineTo(circles[LeftCircleValue] , dataY);
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    //전체 폭 표시
    drawRectangleLines(context, rectTopX, dataY, xLength,centerX)

    for (let l = 0; l < circleCount; l++) {
      
      //위아래 길이 표시
  
      context.beginPath();
      context.moveTo(circles[l] , FirstRowY);
      context.lineTo(circles[l] , dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();
    }
    
    for (let o = 0; o < circleCount-1 ; o++) {
      if( o < (circleCount-1)/2) {

      //오른쪽 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o]+Letterplus, dataY+20);

      } else if (o === (circleCount-1)/2) {

      //가운데 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[0];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o+1]+Letterplus, dataY+20);
      } else {

      //왼쪽 원 사이에 거리 표시
      const distanceleft = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceleft)}`, circles[o]+Letterplus + distanceleft, dataY+20);
      }
    }
  }


  //세로 거리 가로 선
  context.beginPath();
  context.moveTo(rectTopX - 20 , FirstRowY-Vert_spacing);
  context.lineTo(circles[LeftCircleValue] , FirstRowY-Vert_spacing);
  context.strokeStyle = "black";
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(rectTopX - 20 , FirstRowY);
  context.lineTo(circles[LeftCircleValue] , FirstRowY);
  context.strokeStyle = "black";
  context.stroke();
  context.closePath();

  //세로 거리 세로 선
  context.beginPath();
  context.moveTo(rectTopX - 20 , FirstRowY);
  context.lineTo(rectTopX - 20 , FirstRowY-Vert_spacing);
  context.strokeStyle = "black";
  context.stroke();
  context.closePath();
  

  //세로 거리 표기
  context.font = "15px Arial";
  context.fillStyle = "black";
  context.fillText(Vert_spacing, rectTopX - 40 , FirstRowY-Vert_spacing*1/3);

  //마지막에 데이터 출력
  var bottomMargin = 20; // 하단 여백
  var textHeight = 16; // 텍스트 높이

  var userInputText = `폭의 길이: ${xLength} cm as 가로 간격: ${Hori_spacing}cm, 세로 간격: ${Vert_spacing}cm as 개수: ${circleCount}개, 지름: ${diameter}cm`;
  // 텍스트 스타일 설정

  if (Mid_spacingVal !== 0) { // Mid_spacingVal 값이 비어있지 않으면
    // 여기에 조건문 내용 추가
    var userInputText = `폭의 길이: ${xLength} cm as 가로 간격: ${Hori_spacing}(${Mid_spacingVal})cm, 세로 간격: ${Vert_spacing}cm as 개수: ${circleCount}개, 지름: ${diameter}cm`;
    // 텍스트 스타일 설정
  }
  context.font = "16px Arial";
  context.fillStyle = "black";

 // 텍스트를 다음 줄로 넘어가며 그리기
  var lines = userInputText.split("as");
  var lineHeight = 20; // 줄 간격
  var startXValues = [];
  console.log(lines);

  for(var x = 0;x < lines.length; x++){
  var startXValuesindex = centerX - context.measureText(lines[x]).width / 2;
  startXValues.push(startXValuesindex);
  }
  var startY = canvas.height - textHeight - bottomMargin - lineHeight*3; // 텍스트가 그려질 시작 Y 좌표

  lines.forEach(function(line, index) {
    var startX = startXValues[index]; // 현재 요소의 인덱스에 해당하는 startX 값을 가져옴
    context.fillText(line, startX, startY);
    startY += lineHeight;

  });
}

drawCanvas()
