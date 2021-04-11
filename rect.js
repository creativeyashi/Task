
var canvas = document.querySelector('#canvas');
canvas.addEventListener('dragover', allowDrop)
canvas.addEventListener('drop', dropIt)
var rectangle = document.querySelector('#rectangle').addEventListener("click", makeShape);
var currentShape = [];
var i;
var shapeNum = 1;
var isPlural = 1;
var colors = document.querySelectorAll('.pallet');
for (i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", changeColor)
}
document.querySelector('#deleteIt').addEventListener("click", deleteIt);
window.addEventListener("keydown", deleteIt);
window.addEventListener("keydown", isChoosePlural);
window.addEventListener("keyup", isChoosePlural);
var initResize = [
    function (e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        function Resize(e) {
            for (var j = 0; j < currentShape.length; j++) {
                currentShape[j].style.width = (currentShape[j].offsetWidth + currentShape[j].offsetLeft - e.offsetX) + 'px';
                currentShape[j].style.left = (e.offsetX) + 'px';
                currentShape[j].style.height = (currentShape[j].offsetHeight + currentShape[j].offsetTop - e.offsetY) + 'px';
                currentShape[j].style.top = (e.offsetY) + 'px';
            }
        }
        function stopResize(e) {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    },
    function (e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        function Resize(e) {
            for (var j = 0; j < currentShape.length; j++) {
                currentShape[j].style.width = (e.offsetX - currentShape[j].offsetLeft) + 'px';
                currentShape[j].style.height = (currentShape[j].offsetHeight + currentShape[j].offsetTop - e.offsetY) + 'px';
                currentShape[j].style.top = (e.offsetY) + 'px';
            }
        }
        function stopResize(e) {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    },
    function (e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        function Resize(e) {
              console.log(e)
            console.log(currentShape[0])
            for (var j = 0; j < currentShape.length; j++) {
                currentShape[j].style.height = (e.offsetY - currentShape[j].offsetTop) + 'px';
                currentShape[j].style.width = (currentShape[j].offsetWidth + currentShape[j].offsetLeft - e.offsetX) + 'px';
                currentShape[j].style.left = (e.offsetX) + 'px';
            }
        }
        function stopResize(e) {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    },
    function (e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        function Resize(e) {
            for (var j = 0; j < currentShape.length; j++) {
                currentShape[j].style.width = (e.offsetX - currentShape[j].offsetLeft) + 'px';
                currentShape[j].style.height = (e.offsetY - currentShape[j].offsetTop) + 'px';
            }
        }
        function stopResize(e) {
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
    }
]
function createFourRectangles() {
    var j;
    var newSmallRec = [];
    for (j = 0; j < 4; j++) {
        newSmallRec[j] = document.createElement('div');
        newSmallRec[j].addEventListener('mousedown', initResize[j], false);
    }
    newSmallRec[0].className = 'smallRec top left';
    newSmallRec[1].className = 'smallRec top right';
    newSmallRec[2].className = 'smallRec bottom left';
    newSmallRec[3].className = 'smallRec bottom right';
    return newSmallRec
}

function isChoosePlural(e) {
    if (e.key == "Control") {
        if (e.type == "keydown") {
            isPlural = 2;
        }
        if (e.type == "keyup") {
            isPlural = 1;
        }
    }
}

function changeColor(e) {
    for (var j = 0; j < currentShape.length; j++)
        currentShape[j].style.background = e.target.id;
}

function deleteIt(e) {
    if (e.type == "click" || e.key == "Delete") {
        for (var j = 0; j < currentShape.length; j++)
            currentShape[j].style.display = 'none';
    }
}

function makeShape(shape) {
    var newShape = document.createElement('div');
    newShape.className = 'shape';
    newShape.style.background = "rgb(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ")";
    newShape.style.height = (parseInt(Math.random() * 200)) + "px";
    newShape.style.width = (parseInt(Math.random() * 200)) + "px";
    newShape.style.top = (parseInt(Math.random() * 400)) + "px";
    newShape.style.left = (parseInt(Math.random() * 1100)) + "px";
    newShape.id = "shape" + shapeNum;
    shapeNum++;
    newShape.addEventListener("click", addFourRectangles);
    newShape.draggable = 'true';
    newShape.addEventListener('dragstart', dragIt)
    canvas.appendChild(newShape);
}

function unFocusShapes() {
    for (k = 0; k < currentShape.length; k++) {
        for (j = 0; j < 4; j++) {
            currentShape[k].removeChild(currentShape[k].firstChild)
        }
    }
    currentShape.length = 0;
}

function addFourRectangles(clickedShape) {
    var j, k;
    if (clickedShape.target.childElementCount == 4) {
        if (isPlural == 1) {
            unFocusShapes()
        }
        else {
            for (k = 0; k < currentShape.length; k++) {
                if (currentShape[k] == clickedShape.target) {
                    currentShape.splice(k, 1);
                    for (j = 0; j < 4; j++) {
                        clickedShape.target.removeChild(clickedShape.target.lastChild);
                    }
                }
            }
        }
    }
    else {
        if (isPlural == 1) {
            unFocusShapes()
        }
        var temp = createFourRectangles()
        for (j = 0; j < 4; j++) {
            clickedShape.target.appendChild(temp[j]);
        }
        currentShape.push(clickedShape.target)
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}
function dragIt(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function dropIt(ev) {
    ev.preventDefault();
    var shape = document.getElementById(ev.dataTransfer.getData("text"))
    var deltaX = ev.offsetX - parseInt(shape.style.left)
    var deltaY = ev.offsetY - parseInt(shape.style.top)
    if (shape.childElementCount == 4) {
        for (var j = 0; j < currentShape.length; j++) {
            currentShape[j].style.left = parseInt(currentShape[j].style.left) + deltaX + "px";
            currentShape[j].style.top = parseInt(currentShape[j].style.top) + deltaY + "px";
        }
    }
    else {
        shape.style.top = ev.offsetY + "px";
        shape.style.left = ev.offsetX + "px";
        unFocusShapes()
        var temp = createFourRectangles()
        for (j = 0; j < 4; j++) {
            shape.appendChild(temp[j]);
        }
        currentShape.push(shape)
    }
}
