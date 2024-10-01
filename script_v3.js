
const container = document.getElementById('canvasContainer');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
container.appendChild(canvas);

// Full HD 해상도 설정
const scale = 5; // 화면에 표시되는 크기의 2배로 설정
canvas.height = 960*scale;
canvas.width = 540*scale;
canvas.style.height = "960px";
canvas.style.width = "540px";
ctx.scale(scale, scale);

function drawRectangle() {
    // 입력값 가져오기
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const holeSize = Number(document.getElementById('holeSize').value);
    const horizontalSpacing = Number(document.getElementById('horizontalSpacing').value);
    const holeCount = Number(document.getElementById('holeCount').value);


    // 캔버스 초기화 (흰색 배경)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 사각형 중앙 정렬을 위한 위치 계산
    const x = (canvas.width / scale - width) / 2;
    const y = (canvas.height / scale - height) / 2;

    // 사각형 그리기 (검은색 선)
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // 치수 표기 (검은색 텍스트)
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(`${width}`, x + width / 2, y - 10);
    ctx.textAlign = 'right';
    ctx.fillText(`${height}`, x - 10, y + height / 2);

    // 치수선 그리기
    //drawDimensionLine(20, 10, width + 20, 10, `${width}`);
    //drawDimensionLine(10, 20, 10, height + 20, `${height}`);
    drawDimensionLine(31, height + 30, 31 + holeSpacing, height + 30, `${holeSpacing.toFixed(1)}`);
    // 폭 표시
    ctx.fillText(`폭 ${horizontalSpacing}`, width / 2, height + 15);
    ctx.scale(1/scale, 1/scale);

}

function downloadPNG() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'full_hd_rectangle.png';
    link.href = dataURL;
    link.click();
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width / scale, canvas.height / scale]
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / scale, canvas.height / scale);
    pdf.save('full_hd_rectangle.pdf');
}

// 초기 흰색 배경 그리기
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    ctx.fillText(label, midX, midY - 5);
}

function drawArrow(fromX, fromY, toX, toY) {
    const headLen = 5;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
