function toggleMid_spacingInput() {
  var Mid_spacingInput = document.getElementById("Mid_spacingInput");
  var Mid_spacingCheckbox = document.getElementById("Mid_spacingCheckbox");
  
  if (Mid_spacingCheckbox.checked) {
    Mid_spacingInput.style.display = "block";
  } else {
    Mid_spacingInput.style.display = "none";
  }
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function drawCanvas() {
  var xLength = parseInt(document.getElementById("xLengthInput").value);
  var circleCount = parseInt(document.getElementById("circleCountInput").value);
  var diameter = parseInt(document.getElementById("diameterInput").value);
  var Hori_spacing = parseInt(document.getElementById("Hori_spacingInput").value);
  var Vert_spacing = parseInt(document.getElementById("Vert_spacingInput").value);

  var Mid_spacingInput = document.getElementById("Mid_spacingInput"); //가운데 다를때

  Mid_spacingInput.addEventListener("input", function() {
    var Mid_spacingInputValue = Mid_spacingInput.value;
    if (Mid_spacingInputValue !== "") {
      // 동작을 수행하는 코드
      Mid_spacingValue = Mid_spacingInputValue/2;
    }
  });

  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  var centerX = canvas.width / 2; // 사각형 가운데 x 좌표

  var rectTopX = centerX - xLength / 2;
  var rectTopY = canvas.height -70 - xLength * 2.5;
  var rectBotX = xLength;
  var rectBotY = canvas.height-70;
  var rectlenX = xLength;
  var rectlenY = xLength * 2.5;

  var Letterplus = Hori_spacing/2;
  
  var currentX = centerX;
  var currentY = rectBotY - diameter;

  var RowCircleCount = xLength * 2.5 / Vert_spacing;

  var FirstRowY = rectBotY - diameter;
  var dataY = rectBotY + 10;
  var circles = [];

  //console.log(rectTopX,rectTopY,rectBotX,rectBotY);

  if(Hori_spacing < 30){
    Letterplus = 0;
  } else{
    Letterplus = Hori_spacing*2/5;
  }

  // Draw Rectangle
  context.fillStyle = "black"; // 사각형의 색상
  context.strokeRect(rectTopX, rectTopY, rectlenX, rectlenY);
  

  if (circleCount % 2 === 0){ //짝수

    currentX = centerX + Mid_spacingValue + Hori_spacing/2;

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
      currentX = centerX + Mid_spacingValue -Hori_spacing/2;

      for (let k = 1; k <= circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX + Mid_spacingValue + Hori_spacing/2;
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
    context.beginPath();
    context.moveTo(circles[rightCircleValue] , dataY+20); // 가로선 시작점
    context.lineTo(circles[LeftCircleValue] , dataY+20); // 가로선 끝점
    context.moveTo(circles[LeftCircleValue] , dataY); // 왼쪽선 시작점
    context.lineTo(circles[LeftCircleValue] , dataY+20); // 왼쪽선 끝점
    context.moveTo(circles[rightCircleValue] , dataY); // 오른쪽선 시작점
    context.lineTo(circles[rightCircleValue] , dataY+20); // 오른쪽선 끝점
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    context.font = "15px Arial";
    context.fillStyle = "black";
    context.fillText(xLength, centerX-10, dataY+35); // x폭 표시


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
      context.fillText(`${Math.abs(distanceRight)}`, circles[o]+Letterplus, dataY+15);

      } else if (o === circleCount/2-1) {

      //가운데 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[0];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o+1]+Letterplus, dataY+15);
      } else {

      //왼쪽 원 사이에 거리 표시
      const distanceleft = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceleft)}`, circles[o]+Letterplus + distanceleft, dataY+15);
      }
    }
  } else {  //홀수
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
      currentX = centerX - Mid_spacingValue - Hori_spacing;

      for (let k = 1; k < circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circles.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX + Mid_spacingValue;
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
    context.beginPath();
    context.moveTo(circles[rightCircleValue] , dataY+20); // 가로선 시작점
    context.lineTo(circles[LeftCircleValue] , dataY+20); // 가로선 끝점
    context.moveTo(circles[LeftCircleValue] , dataY); // 왼쪽선 시작점
    context.lineTo(circles[LeftCircleValue] , dataY+20); // 왼쪽선 끝점
    context.moveTo(circles[rightCircleValue] , dataY); // 오른쪽선 시작점
    context.lineTo(circles[rightCircleValue] , dataY+20); // 오른쪽선 끝점
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    context.font = "15px Arial";
    context.fillStyle = "black";
    context.fillText(xLength, centerX-10, dataY+35); // x폭 표시

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
      context.fillText(`${Math.abs(distanceRight)}`, circles[o]+Letterplus, dataY+15);

      } else if (o === (circleCount-1)/2) {

      //가운데 원 사이에 거리 표시
      const distanceRight = circles[o+1] - circles[0];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceRight)}`, circles[o+1]+Letterplus, dataY+15);
      } else {

      //왼쪽 원 사이에 거리 표시
      const distanceleft = circles[o+1] - circles[o];
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(`${Math.abs(distanceleft)}`, circles[o]+Letterplus + distanceleft, dataY+15);
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
  var userInputText = `폭의 길이: ${xLength} cm 
  가로 간격: ${Hori_spacing}cm, 세로 간격: ${Vert_spacing}cm
  개수: ${circleCount}개, 지름: ${diameter}cm`;
  document.getElementById("userInputText").innerText = userInputText;
  
}