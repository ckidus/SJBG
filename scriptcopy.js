var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function drawCanvas() {
  var xLength = parseInt(document.getElementById("xLengthInput").value);
  var circleCount = parseInt(document.getElementById("circleCountInput").value);
  var diameter = parseInt(document.getElementById("diameterInput").value);
  var Hori_spacing = parseInt(document.getElementById("Hori_spacingInput").value);
  var Vert_spacing = parseInt(document.getElementById("Vert_spacingInput").value);

  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  var centerX = canvas.width / 2; // 사각형 가운데 x 좌표

  var rectTopX = centerX - xLength / 2;
  var rectTopY = canvas.height -70 - xLength * 2.5;
  var rectBotX = xLength;
  var rectBotY = canvas.height-70;
  var rectlenX = xLength;
  var rectlenY = xLength * 2.5;
  
  var currentX = centerX;
  var currentY = rectBotY - diameter;

  var RowCircleCount = xLength * 2.5 / Vert_spacing;

  var FirstRowY = rectBotY - diameter;
  var dataY = rectBotY + diameter;
  var circlesLeft = [];
  var circlesRight = [];

  console.log(rectTopX,rectTopY,rectBotX,rectBotY);

  context.beginPath();
  context.arc(400, 700, 10, 0, 2 * Math.PI); // 점을 그리는 부분
  context.fillStyle = "blue"; // 점의 색상
  context.fill();
  context.closePath();

  // Draw Rectangle
  context.fillStyle = "black"; // 사각형의 색상
  context.strokeRect(rectTopX, rectTopY, rectlenX, rectlenY);

  if (circleCount % 2 === 0){

    currentX = centerX + Hori_spacing/2;

    for (let i = 1; i < RowCircleCount; i++) {
      for (let j = 0; j < circleCount/2; j++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circlesRight.push(currentX);
        currentX += Hori_spacing;
      }
      currentX = centerX-Hori_spacing/2;

      for (let k = 1; k <= circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circlesLeft.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX + Hori_spacing/2;
      currentY -= Vert_spacing;
    }
  } else{
    for (let i = 1; i < RowCircleCount; i++) {
      for (let j = 0; j < circleCount/2; j++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circlesRight.push(currentX);
        currentX += Hori_spacing;
      }
      currentX = centerX-Hori_spacing;

      for (let k = 1; k < circleCount/2; k++) {
        context.beginPath();
        context.arc(currentX, currentY, diameter / 2, 0, 2 * Math.PI);
        context.fillStyle = "#ffffff"; // 원의 색상
        context.stroke();
        context.closePath();
        
        circlesLeft.push(currentX);
        currentX -= Hori_spacing;
      }
      currentX = centerX;
      currentY -= Vert_spacing;
    }
  }

  /*// 사각형 가운데에 수평 중심선 그리기
  context.beginPath();
  context.moveTo(centerX, rectY); // 시작점
  context.lineTo(centerX, rectY + xLength * 2.5); // 끝점
  context.strokeStyle = "black"; // 선의 색상
  context.stroke();
  context.closePath();
  */
  /*// 사각형 가운데에 수평 중심선 그리기
  context.beginPath();
  context.moveTo(circlesLeft[1], FirstRowY); // 시작점
  context.lineTo(circlesLeft[3], FirstRowY); // 끝점
  context.strokeStyle = "black"; // 선의 색상
  context.stroke();
  context.closePath();
  */

  console.log(circlesLeft);
  console.log(circleCount);
  console.log(FirstRowY);
  console.log(circlesLeft[0]);
  console.log(circleCount/2 - 1);

  for (let l = 0; l < circleCount/2; l++) {
      //왼쪽 좌우 길이 표시
      context.beginPath();
      context.moveTo(circlesLeft[l] , dataY);
      context.lineTo(circlesLeft[l + 1], dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();

      //왼쪽 위아래 길이 표시

      context.beginPath();
      context.moveTo(circlesLeft[l+1] , FirstRowY);
      context.lineTo(circlesLeft[l+1], dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();

      //오른쪽 좌우 길이 표시
      context.beginPath();
      context.moveTo(circlesRight[l] , dataY);
      context.lineTo(circlesRight[l + 1], dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();

      //오른쪽 위아래 길이 표시

      context.beginPath();
      context.moveTo(circlesRight[l+1] , FirstRowY);
      context.lineTo(circlesRight[l+1], dataY);
      context.strokeStyle = "black";
      context.stroke();
      context.closePath();
  }
  for (let o = 0; o < circleCount/2-1; o++) {
    //왼쪽 원 사이에 거리 표시
    const distanceleft = circlesLeft[o+1] - circlesLeft[o];
    context.font = "15px Arial";
    context.fillStyle = "black";
    context.fillText(`${Math.abs(distanceleft)}`, circlesLeft[o] + distanceleft, dataY);

    //오른쪽 원 사이에 거리 표시
    const distanceRight = circlesRight[o+1] - circlesRight[o];
    context.font = "15px Arial";
    context.fillStyle = "black";
    context.fillText(`${Math.abs(distanceRight)}`, circlesRight[o] + distanceRight, dataY);
  }
}