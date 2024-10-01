const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');

function drawDiagram() {
    // 입력값 가져오기
    const height = Number(document.getElementById('height').value);
    const width = Number(document.getElementById('width').value);
    const holeSize = Number(document.getElementById('holeSize').value);
    const thickness = Number(document.getElementById('thickness').value);
    const holeCount = Number(document.getElementById('holeCount').value);

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 스케일 설정 (캔버스 크기에 맞추기 위해)
    const scale = Math.min(350 / width, 350 / height);
    ctx.scale(scale, scale);

    // 외곽선 그리기
    ctx.strokeRect(20, 20, width, height);

    // 구멍 그리기
    const holeSpacing = (width - 62) / (holeCount - 1);
    for (let i = 0; i < holeCount; i++) {
        const x = 31 + i * holeSpacing;
        const y = height / 2;
        ctx.beginPath();
        ctx.arc(x, y, holeSize / 2, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 치수선 그리기
    drawDimensionLine(20, 10, width + 20, 10, `${width}`);
    drawDimensionLine(10, 20, 10, height + 20, `${height}`);
    drawDimensionLine(31, height + 30, 31 + holeSpacing, height + 30, `${holeSpacing.toFixed(1)}`);
    
    // 폭 표시
    ctx.fillText(`폭 ${thickness}`, width / 2, height + 15);

    ctx.scale(1/scale, 1/scale);
}

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

// '만들기' 버튼 클릭 이벤트
generateBtn.addEventListener('click', drawDiagram);

// 페이지 로드 시 초기 도면 그리기
drawDiagram();