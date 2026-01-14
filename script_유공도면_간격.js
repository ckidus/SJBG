
const container = document.getElementById('canvasContainer');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
container.appendChild(canvas);


//도면 그리기
function drawRectangle() {

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Full HD 해상도 설정
    const scale = 4; // 화면에 표시되는 크기의 4배로 설정
    canvas.width = 540 * scale/2;  // 가로 해상도를 1080으로 변경
    canvas.height = 960 * scale/2; // 세로 해상도를 1920으로 변경
    canvas.style.width = "540px";
    canvas.style.height = "960px";
    ctx.scale(scale, scale);

    
    // 입력값 가져오기
    const width = parseInt(document.getElementById('width').value);
    const holeSize = Number(document.getElementById('holeSize').value);
    const height = 250-holeSize-5 //parseInt(document.getElementById('height').value);
    const horizontalSpacing = Number(document.getElementById('horizontalSpacing').value);
    const CenterGap = Number(document.getElementById('CenterGap').value);
    const verticalSpacing = Number(document.getElementById('verticalSpacing').value);
    const holeCount = Number(document.getElementById('holeCount').value);
    const checkbox = document.getElementById('centerhole'); // HTML의 id와 일치 확인

    // 캔버스 초기화 (흰색 배경)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 사각형 중앙 정렬을 위한 위치 계산
    const x = (canvas.width / scale - width) / 2;  
    const y = (canvas.height / scale - height) / 2 - 10; //중앙보다 높이 설정
    const midPointIndex = Math.floor(holeCount / 2); // 구멍 정중앙이 몇번째 인지 확인

    // 물결 무늬 사각형 그리기
    // 매개변수: (컨텍스트, x좌표, y좌표, 너비, 높이, 주파수, 진폭)
    drawWavyRectangle(ctx, x, y, width, height, 5, 5);
    console.log("x : " + x + " y : " + y);
    
    // // 사각형 그리기 (검은색 선)
    // ctx.beginPath();    // ctx.rect(x, y, width, height);
    // ctx.lineWidth = 1;    // ctx.strokeStyle = 'black';    // ctx.stroke();

    // // 테스트 // ctx.beginPath(); // ctx.moveTo(x, y);
    // ctx.lineTo(x+width, y+height);    // ctx.stroke();// // 테스트// ctx.beginPath();// ctx.moveTo(x+width, y);// ctx.lineTo(x, y+height);// ctx.stroke();
    

    //구멍수 짝수일때 구멍 그리기
    ctx.lineWidth = 0.5;
    cirlce_startX = x + width / 2 - ( ((holeCount / 2) - 1 ) * horizontalSpacing) - CenterGap/2;
    cirlce_startY = y + height - 20; // 구멍위치 선에서 20 띄우고 시작
    console.log("cirlce_startX : " + cirlce_startX + " cirlce_startY : " + cirlce_startY);
    drawCircles(cirlce_startX, cirlce_startY, holeSize, horizontalSpacing, height, verticalSpacing, holeCount, CenterGap);

    // 가로 치수선 그리기 + 개별 폭 표시
    ctx.textAlign = 'center';
    ctx.font = '7px Arial';
    ctx.fillStyle = 'red';
    bot_rect_right_X = x+width; //사각형 오른쪽 밑 x좌표
    bot_rect_left_Y = y+height; //사각형 왼쪽 밑 y좌표
    indiv_dimension_y = bot_rect_left_Y + 10;
    indiv_dimension_x = cirlce_startX;
    total_dimension_y = indiv_dimension_y + 20;
    space_last = cirlce_startX - x//외곽 구멍에서 사각형 끝까지 거리
    ctx.lineWidth = 0.5;
    drawDimensionLine(x,indiv_dimension_y,indiv_dimension_x,indiv_dimension_y,`${space_last}`) //왼쪽 마지막에서 구멍까지 
    drawDimensionLine_simple(x, indiv_dimension_y, x, cirlce_startY)
    let last_x ;
    if (holeCount > 1) {
        // 이전 구멍의 치수선 x좌표를 저장할 변수 (초기값은 첫 번째 구멍의 중심)
        last_x = cirlce_startX; 
        
        // 첫 번째 구멍의 세로 치수 보조선을 먼저 그립니다.
        drawDimensionLine_simple(last_x, indiv_dimension_y, last_x, cirlce_startY);

        // 각 구멍 '사이의 간격'을 그리기 위해 (holeCount - 1)번 반복합니다.
            for (let i = 0; i < holeCount - 1; i++) {
                
                // 이번에 적용할 간격의 기본값은 일반 간격(horizontalSpacing)입니다.
                let currentSpacing = horizontalSpacing;

                // 현재 그리고 있는 간격이 중앙 간격인지 확인합니다.
                // 중앙 간격은 midPointIndex 바로 전 순서(i)에 위치합니다.
                if (i === midPointIndex - 1) {
                    currentSpacing = CenterGap;
                }

                // 현재 간격을 더해 다음 구멍의 치수선 위치를 계산합니다.
                const next_x = last_x + currentSpacing;

                // 이전 위치(last_x)에서 다음 위치(next_x)까지 치수선을 그립니다.
                // 레이블에는 현재 적용된 간격(currentSpacing)을 표시합니다.
                drawDimensionLine(last_x, indiv_dimension_y, next_x, indiv_dimension_y, `${currentSpacing}`);
                //console.log("next_x : " + next_x + " currentSpacing : " + currentSpacing);

                // 다음 구멍의 세로 치수 보조선을 그립니다.
                drawDimensionLine_simple(next_x, indiv_dimension_y, next_x, cirlce_startY);
                
                // 다음 반복을 위해, 현재 위치를 '이전 위치' 변수에 저장합니다.
                last_x = next_x;
            }
        }

    /*
    if(holeCount>1){
        let additionalOffset = 0; // 추가될 간격
        let horizontalSpacinglabel = horizontalSpacing;
        for(let i = 0; i < holeCount; i++){
            // 중앙 지점을 넘어서는 구멍부터는 middleGap을 적용
            if (i >= midPointIndex) {
                // 일반 간격(horizontalSpacing)은 기본 계산에 포함되므로, 그 차액만 더해줌
                additionalOffset = CenterGap;
            }
            if (i == midPointIndex) {
                horizontalSpacinglabel = CenterGap; //한번만 변경
            }
            drawDimensionLine(indiv_dimension_x, indiv_dimension_y, indiv_dimension_x + horizontalSpacing + additionalOffset, indiv_dimension_y, `${horizontalSpacinglabel}`);
            indiv_dimension_x = cirlce_startX + i *  horizontalSpacing + additionalOffset;
            console.log("x위치: " +indiv_dimension_x + " additionalOffset: " +additionalOffset + " horizontalSpacinglabel: " +horizontalSpacinglabel +" horizontalSpacing: " +horizontalSpacing);
            drawDimensionLine_simple(indiv_dimension_x, indiv_dimension_y, indiv_dimension_x, cirlce_startY)
            horizontalSpacinglabel = horizontalSpacing;
            additionalOffset = 0;
            
        }
    }
*/
    drawDimensionLine(bot_rect_right_X,indiv_dimension_y, last_x ,indiv_dimension_y,`${space_last}`) //오른쪽 마지막에서 구멍까지
    drawDimensionLine_simple(bot_rect_right_X, indiv_dimension_y, bot_rect_right_X, bot_rect_left_Y)

    //전체 폭 표시 및 치수선 그리기
    drawDimensionLine(x,total_dimension_y,bot_rect_right_X,total_dimension_y,`${width}`)
    drawDimensionLine_simple(x, total_dimension_y, x, bot_rect_left_Y)
    drawDimensionLine_simple(bot_rect_right_X, total_dimension_y, bot_rect_right_X, bot_rect_left_Y)

    // 세로 치수선 그리기 + y축 치수 표기
    indiv_dimension_y_ver = cirlce_startY;
    drawDimensionLine_simple(x-10, indiv_dimension_y_ver, cirlce_startX, indiv_dimension_y_ver)
    for(let i = 1; i < 3; i++){
        drawDimensionLine_vert(x-10, indiv_dimension_y_ver, x-10, indiv_dimension_y_ver - verticalSpacing, `${verticalSpacing}`);
        indiv_dimension_y_ver = cirlce_startY - i *  verticalSpacing;        
        //console.log("y위치: " +indiv_dimension_y_ver);
        drawDimensionLine_simple(x-10, indiv_dimension_y_ver, cirlce_startX, indiv_dimension_y_ver)
    }

    //도면 전체 정보
    ctx.font = '10px Arial';
    center_X = x + width / 2;
    bot_center_Y = total_dimension_y + 30;
    lineHeight = 14;
    ctx.fillStyle = 'black';
    ctx.fillText("폭 " +width, center_X, bot_center_Y);
    ctx.fillText("간격 " +horizontalSpacing +"(" + CenterGap + ")*"+verticalSpacing, center_X, bot_center_Y+lineHeight);
    ctx.fillText(holeCount+"구"+" "+holeSize +"파이", center_X, bot_center_Y + lineHeight * 2);
    
    ctx.fillStyle = 'red';
    ctx.fillText("유공의 특성상 제품 생산 후 교환 및 환불이 불가합니다.", center_X, y-lineHeight*2);

    //확인표 만들기
    drawTable();

    // 체크박스 침공 추가
    checkbox.addEventListener('change', function() {
        if (this.checked) {
        draw_centerhole(x, y, width, height);
        } else {
        clearCanvas();
        }
    });


    // 디버깅을 위한 로그
    //console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    //console.log(`Drawing rectangle at (${x}, ${y}) with size ${width}x${height}`);
    //console.log(`구멍 시작위치 (${cirlce_startX}, ${cirlce_startY})`);
}
//png 다운로드
function downloadPNG() {
    // 입력값 가져오기
    const width = parseInt(document.getElementById('width').value);
    const holeSize = Number(document.getElementById('holeSize').value);
    const horizontalSpacing = Number(document.getElementById('horizontalSpacing').value);
    const verticalSpacing = Number(document.getElementById('verticalSpacing').value);
    const holeCount = Number(document.getElementById('holeCount').value);

    // 현재 날짜를 yymmdd 형식으로 가져오기
    const today = new Date();
    const formattedDate = today.toISOString().slice(2,10).replace(/-/g, '');

    // 파일명 생성
    const fileName = `${formattedDate}_${width}_${horizontalSpacing}x${verticalSpacing}_${holeCount}구_${holeSize}파이.png`;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataURL;
    link.click();
}
//pdf 다운로드
function downloadPDF() {
    const scale = 4;
    const canvas_width = 540 * scale / 2;
    const canvas_height = 960 * scale / 2;
    const { jsPDF } = window.jspdf;

    // 입력값 가져오기
    const width = parseInt(document.getElementById('width').value);
    const holeSize = Number(document.getElementById('holeSize').value);
    const horizontalSpacing = Number(document.getElementById('horizontalSpacing').value);
    const verticalSpacing = Number(document.getElementById('verticalSpacing').value);
    const holeCount = Number(document.getElementById('holeCount').value);
    
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas_width, canvas_height]
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas_width, canvas_height);

    // 현재 날짜를 yymmdd 형식으로 가져오기
    const today = new Date();
    const formattedDate = today.toISOString().slice(2,10).replace(/-/g, '');

    // 파일명 생성
    const fileName = `${formattedDate}_${width}_${horizontalSpacing}x${verticalSpacing}_${holeCount}구_${holeSize}파이.pdf`;

    pdf.save(fileName);
}

//지시선 그리기
function drawDimensionLine_simple(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//지시선 화살표와 같이 그리기
function drawDimensionLine(x1, y1, x2, y2, label) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 화살표 그리기
    drawArrow(x1, y1, x2, y2);
    drawArrow(x2, y2, x1, y1);

    // 레이블 그리기
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.fillText(label, midX, midY + 7);
    //console.log("x1 : " + x1 + " x2 : " + x2);
    //console.log("midX : " + midX + " label : " + label);
}

function drawDimensionLine_vert(x1, y1, x2, y2, label) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 화살표 그리기
    drawArrow(x1, y1, x2, y2);
    drawArrow(x2, y2, x1, y1);

    // 레이블 그리기
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.fillText(label, midX-5, midY+2.5);
}
//화살표 그리기
function drawArrow(fromX, fromY, toX, toY) {
    const headLen = 3;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

// 원 그리기
function drawCircles(startX, startY, holeSize, horizontalSpacing, height, verticalSpacing, holeCount, CenterGap) {
    const radius = holeSize / 2;
    const verticalCount = parseInt((height - 10) / verticalSpacing);
    const midPointIndex = Math.floor(holeCount / 2); // 구멍들의 중앙 지점 계산

    //console.log("반지름: " + radius);
    //console.log("위아래 개수: " + verticalCount);

    // 
    for (let j = 0; j < verticalCount; j++) {
        const circle_y = startY - j * verticalSpacing;
        let circle_last_x = cirlce_startX; 

        // 
        for (let i = 0; i < holeCount; i++) {
            // 이번에 적용할 간격의 기본값은 일반 간격(horizontalSpacing)입니다.
            let currentSpacing = horizontalSpacing;

            // 현재 그리고 있는 간격이 중앙 간격인지 확인합니다.
            // 중앙 간격은 midPointIndex 바로 전 순서(i)에 위치합니다.
            if (i === midPointIndex - 1) {
                currentSpacing = CenterGap;
            }

            const circle_next_x = circle_last_x + currentSpacing;


            ctx.beginPath();
            ctx.arc(circle_last_x, circle_y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            console.log("원 " + i +"번째 위치: " + circle_last_x + " currentSpacing " + currentSpacing);
            circle_last_x = circle_next_x
        }
    }
}

// 물결 무늬 사각형을 그리는 함수
function drawWavyRectangle(ctx, x, y, width, height, frequency, amplitude) {
    ctx.beginPath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    
    // 시작점 설정 (왼쪽 아래 모서리)
    ctx.moveTo(x, y + height);
    
    // 왼쪽 세로선 그리기
    ctx.lineTo(x, y + amplitude);
    
    // 물결 무늬 상단 그리기
    for (let i = 0; i <= width; i++) {
        // 사인 함수를 사용하여 물결 효과 생성
        ctx.lineTo(x + i, y + amplitude * Math.sin(frequency * i * Math.PI / width));
    }
    
    // 오른쪽 세로선 그리기
    ctx.lineTo(x + width, y + height);
    
    // 하단 가로선 그리기
    ctx.lineTo(x, y + height);
    
    // 경로 닫기
    ctx.closePath();
    
    // 선 그리기
    ctx.stroke();
}

//인표 만들기
function drawTable() {

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // 수직선 그리기 (반복문 사용)
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(130 + i * 40, 15);
        ctx.lineTo(130 + i * 40, 55);
        ctx.stroke();
    }

    // 수평선 그리기
    ctx.beginPath();
    ctx.moveTo(130 , 15);
    ctx.lineTo(130 + 40 * 3, 15);
    ctx.moveTo(130 , 30 );
    ctx.lineTo(130 + 40 * 3, 30);
    ctx.moveTo(130 , 55 );
    ctx.lineTo(130 + 40 * 3, 55);
    ctx.stroke();


    // 텍스트 추가
    ctx.font = '7px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const headers = ['주문자', '현장 책임자', '현장 관리자'];
    for (let i = 0; i < 3; i++) {
        ctx.fillText(headers[i], 150 + i * 40, 25);
    }
}


// 2. 침공 전용 그리기 함수 수정
function draw_centerhole(rectX, rectY, rectWidth, rectHeight) {
    
    // 사각형의 가로 중앙 계산
    const centerX = rectX + (rectWidth / 2);
    const hole_radius = 0.5; // 침공 크기 (반지름)
    const gap = 5;           // 침공 사이의 간격

    // 시작점을 사각형 상단(rectY)으로, 끝점을 사각형 하단(rectY + rectHeight)으로 설정
    // 상단 물결 무늬(amplitude)를 고려하여 rectY + 5 정도로 시작하면 더 깔끔합니다.
    for (let y = rectY + 5; y < rectY + rectHeight; y += gap) {
        ctx.beginPath();
        ctx.arc(centerX, y, hole_radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

if (checkbox) {
    checkbox.addEventListener('change', drawRectangle);
}