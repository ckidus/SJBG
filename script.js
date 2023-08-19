function drawRectangle() {
    var xLength = parseInt(document.getElementById("xLengthInput").value);
    var yLength = parseInt(document.getElementById("yLengthInput").value);
    var rectangle = document.getElementById("rectangle");
    
    rectangle.style.width = xLength + "px";
    rectangle.style.height = yLength + "px";
  }
  