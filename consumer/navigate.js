var lastMouseX = 0
var lastMouseY = 0;
var firstMove = true;

function handleKeyDown(event) 
{
    currentlyPressedKeys[event.keyCode] = true;
    var translateMatrix = mat4.create();
    mat4.identity(translateMatrix);
    if (String.fromCharCode(event.keyCode) == "Z") 
    {
        mat4.translate(translateMatrix, [0,0,5]);
    }
    else if (String.fromCharCode(event.keyCode) == "S") 
    {
        mat4.translate(translateMatrix, [0,0,-5]);
    }
    else if (String.fromCharCode(event.keyCode) == "Q") 
    {
        mat4.translate(translateMatrix, [5,0,0]);
    }
    else if (String.fromCharCode(event.keyCode) == "D") 
    {
        mat4.translate(translateMatrix, [-5,0,0]);
    }
    mat4.multiply(translateMatrix, camera.viewMatrix, camera.viewMatrix);

    camera.isOutDated =  true;
}

function handleKeyUp(event) 
{
    currentlyPressedKeys[event.keyCode] = false;
}

function handleMouseMove(event) 
{
    if(firstMove)
    {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        firstMove = false;
        return;
    }

    var newX = event.clientX;
    var newY = event.clientY;

    var deltaX = newX - lastMouseX;
    var newRotationMatrix = mat4.create();
    mat4.identity(newRotationMatrix);
    mat4.rotate(newRotationMatrix, (deltaX / 10*3.14/180), [0, 1, 0]);

    var deltaY = newY - lastMouseY;
    mat4.rotate(newRotationMatrix, (deltaY / 10*3.14/180), [1, 0, 0]);

    mat4.multiply(newRotationMatrix, camera.viewMatrix, camera.viewMatrix);

    lastMouseX = newX
    lastMouseY = newY;
}