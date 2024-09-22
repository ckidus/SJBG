function calculateWeight() {
    // 입력 값 받기
    let thickness = parseFloat(document.getElementById("thickness").value) / 1000; // mm -> m
    let width = parseFloat(document.getElementById("width").value) / 100; // cm -> m
    let length = parseFloat(document.getElementById("length").value); // m
    let holeDiameter = parseFloat(document.getElementById("holeDiameter").value) / 100; // cm -> m
    let verticalSpacing = parseFloat(document.getElementById("verticalSpacing").value) / 100; // cm -> m
    let holeCountPerRow = parseInt(document.getElementById("holeCountPerRow").value); // 열당 구멍 개수
    let density = parseFloat(document.getElementById("density").value); // 비중

    // 필름의 부피 계산 (구멍 제외)
    let filmVolume = thickness * width * length; // 부피 = 두께 * 폭 * 길이

    // 필름의 무게 계산
    let filmWeight = filmVolume * density * 1000; // 무게 = 부피 * 비중 * 물의 밀도 (1000 kg/m^3)

    // 구멍의 부피 계산
    let holeRadius = holeDiameter / 2;
    let holeArea = Math.PI * Math.pow(holeRadius, 2); // 원의 면적 = πr²
    let holeVolume = holeArea * thickness; // 구멍 하나의 부피

    // 전체 구멍 개수 계산
    let holesPerRow = Math.floor(length / verticalSpacing);
    let totalHoles = holesPerRow * holeCountPerRow;

    // 총 구멍 부피 계산
    let totalHoleVolume = holeVolume * totalHoles;

    // 구멍의 무게 계산
    let holeWeight = totalHoleVolume * density * 1000; // 무게 = 부피 * 비중 * 물의 밀도

    // 구멍이 있는 필름의 무게 계산
    let finalFilmWeight = filmWeight - holeWeight;

    // 결과 출력
    document.getElementById("result").innerHTML = `
        <h2>결과</h2>
        <p>필름의 무게 (구멍 제외): ${filmWeight.toFixed(3)} kg</p>
        <p>구멍의 무게: ${holeWeight.toFixed(3)} kg</p>
        <p>구멍이 있을 때 필름의 무게: ${finalFilmWeight.toFixed(3)} kg</p>
    `;
}
