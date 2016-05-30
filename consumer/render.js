// ------------ Tracer ------------
// Initialisation du contexte GL
function initGL(parCanvas) 
{
    try 
    {
        // Contexte webgl
        gl = parCanvas.getContext("webgl");
        gl.viewportWidth = parCanvas.width;
        gl.viewportHeight = parCanvas.height;
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        document.onmousemove = handleMouseMove;
    } 
    catch (e) 
    {
        alert(e.message);
    }
    if (!gl) 
    {
        alert("Error lors de l'initialisation du contexte webgl.");
    }
}

function createBuffersVIC(parObj, parVertexList, parIndexList, parColorList)
{
   // Création du buffer de position
    var vertexPositionBuffer = gl.createBuffer();
    // On bind le buffer de position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    //On copie les données sur ke GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(parVertexList), gl.STATIC_DRAW);
    // 3 données par position
    vertexPositionBuffer.itemSize = 3;
    // Nombre de points
    vertexPositionBuffer.numItems = parVertexList.length / 3;
    // Copie dans la structure l'objet
    parObj.vertexPositionBuffer = vertexPositionBuffer;

    // Création de l'IBO
    var vertexIndexBuffer = gl.createBuffer();
    // ON bind ke buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    // ON copie les données sur le GPU
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(parIndexList), gl.STREAM_DRAW);
    // 3 Données par triangle
    vertexIndexBuffer.itemSize = 3;
    // Nombre d'indexes
    vertexIndexBuffer.numItems = parIndexList.length;
    // On copie dans la structure l'objet
    parObj.vertexIndexBuffer = vertexIndexBuffer;

    // Création du buffer de couleur
    var vertexColorBuffer = gl.createBuffer();
    // On bind le buffer de couleur
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    //On copie les données sur ke GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(parColorList), gl.STATIC_DRAW);
    // 3 données par couleurs
    vertexColorBuffer.itemSize = 3;
    // Nombre de couleurs
    vertexColorBuffer.numItems = parVertexList.length / 3;
    // Copie dans la structure l'objet
    parObj.vertexColorBuffer = vertexColorBuffer;
}

function injectModelMatrix(parProgam, parModel)
{
    gl.uniformMatrix4fv(parProgam.modelMatrix , false, parModel);
}

function injectProjectionMatrix(parProgam, parProjection)
{
    gl.uniformMatrix4fv(parProgam.projMatrix , false, parProjection);
}

function injectView(parProgam, parView)
{
    gl.uniformMatrix4fv(parProgam.viewMatrix , false, parView);
}

function injectNormalMatrix(parProgam, parNormalMatrix)
{
    gl.uniformMatrix4fv(parProgam.normalMatrix , false, parNormalMatrix);
}


function CreateTexture() 
{
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
 
    // Set up texture so we can render any size image and so we are
    // working with pixels.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
    return texture;
  }

function CreateFrameBufferObject(parWidth, parHeight)
{
    var colorTex = CreateTexture();
    gl.bindTexture(gl.TEXTURE_2D, colorTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, parWidth, parHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // // Create the depth texture
    var depthbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, parWidth, parHeight);
    
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = parWidth;
    fbo.height = parHeight;
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthbuffer);

    // fbo.depthTex = depthbuffer;
    fbo.depthTex = depthbuffer;
    fbo.colorTex = colorTex;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    return fbo;
}

function bindFBO(fbo)
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
}

function unbindFBO()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}


// Creation d'un plan
function createQuad(parP1, parP2, parP3, parP4, parColorVal)
{
    // Données de sphere
    var plan = [];
    // Données  attribute
    var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];

    // Pour chacun des somemts
    vertexPositionData.push(parP1[0]);
    vertexPositionData.push(parP1[1]);
    vertexPositionData.push(parP1[2]);

    vertexPositionData.push(parP2[0]);
    vertexPositionData.push(parP2[1]);
    vertexPositionData.push(parP2[2]);

    vertexPositionData.push(parP3[0]);
    vertexPositionData.push(parP3[1]);
    vertexPositionData.push(parP3[2]);

    vertexPositionData.push(parP4[0]);
    vertexPositionData.push(parP4[1]);
    vertexPositionData.push(parP4[2]);


    textureCoordData.push(0);
    textureCoordData.push(0);

    textureCoordData.push(1);
    textureCoordData.push(0);

    textureCoordData.push(0);
    textureCoordData.push(1);

    textureCoordData.push(1);
    textureCoordData.push(1);   

    var norm1 = computeTriangleNormal(parP1, parP3, parP2); 
    var norm2 = computeTriangleNormal(parP2, parP1, parP3); 
    var norm3 = computeTriangleNormal(parP3, parP4, parP2); 
    var norm4 = computeTriangleNormal(parP4, parP2, parP3); 

    normalData.push(norm1[0]);
    normalData.push(norm1[1]);
    normalData.push(norm1[2]);

    normalData.push(norm2[0]);
    normalData.push(norm2[1]);
    normalData.push(norm2[2]);

    normalData.push(norm3[0]);
    normalData.push(norm3[1]);
    normalData.push(norm3[2]);

    normalData.push(norm4[0]);
    normalData.push(norm4[1]);
    normalData.push(norm4[2]);

    // Tableau d'indexes
    var indexData = [];
    indexData.push(0);
    indexData.push(1);
    indexData.push(2);
    indexData.push(1);
    indexData.push(2);
    indexData.push(3);


    createBuffersVINT(plan, vertexPositionData, indexData, normalData, textureCoordData);
    // On copie les autres données
    plan.position = [0,0,0];
    plan.colorVal = parColorVal;

    return plan;
}


// Creation d'une soupe de triangle
function BuildSceneObjectFromTriangleList()
{
    // Données de sphere
    var sceneObject = [];
    // Données  attribute
    var vertexPositionData = [];
    var colorData = [];
    var indexData = [];

    var nbprimtives = trianglePrimitives.length;
    for(var count = 0; count < nbprimtives; ++count)
    {
        var obj = trianglePrimitives[count]
        vertexPositionData.push(obj.p0[0]);
        vertexPositionData.push(obj.p0[1]);
        vertexPositionData.push(obj.p0[2]);

        vertexPositionData.push(obj.p1[0]);
        vertexPositionData.push(obj.p1[1]);
        vertexPositionData.push(obj.p1[2]);

        vertexPositionData.push(obj.p2[0]);
        vertexPositionData.push(obj.p2[1]);
        vertexPositionData.push(obj.p2[2]);

        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        indexData.push(count*3 + 0);
        indexData.push(count*3 + 1);
        indexData.push(count*3 + 2);
    }

    createBuffersVIC(sceneObject, vertexPositionData, indexData, colorData);
    // On copie les autres données
    sceneObject.position = [0,0,0];
    sceneObject.colorVal = [1,0,0];
    sceneObject.primitive = gl.TRIANGLES

    return sceneObject;
}

// Creation d'une soupe de lignes
function BuildSceneObjectFromLineList()
{
    // Données de sphere
    var sceneObject = [];
    // Données  attribute
    var vertexPositionData = [];
    var colorData = [];
    var indexData = [];

    var nbprimtives = linePrimitives.length;
    for(var count = 0; count < nbprimtives; ++count)
    {
        var obj = linePrimitives[count]
        vertexPositionData.push(obj.p0[0]);
        vertexPositionData.push(obj.p0[1]);
        vertexPositionData.push(obj.p0[2]);

        vertexPositionData.push(obj.p1[0]);
        vertexPositionData.push(obj.p1[1]);
        vertexPositionData.push(obj.p1[2]);
    
        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        indexData.push(count*2 + 0);
        indexData.push(count*2 + 1);
    }

    createBuffersVIC(sceneObject, vertexPositionData, indexData, colorData);
    // On copie les autres données
    sceneObject.position = [0,0,0];
    sceneObject.colorVal = [1,0,0];
    sceneObject.primitive = gl.LINES

    return sceneObject;
}


// Creation d'une soupe de lignes
function BuildSceneObjectFromPointList()
{
    // Données de sphere
    var sceneObject = [];
    // Données  attribute
    var vertexPositionData = [];
    var colorData = [];
    var indexData = [];

    var nbprimtives = pointPrimitives.length;
    for(var count = 0; count < nbprimtives; ++count)
    {
        var obj = pointPrimitives[count]
        vertexPositionData.push(obj.p0[0]);
        vertexPositionData.push(obj.p0[1]);
        vertexPositionData.push(obj.p0[2]);
        
        colorData.push(obj.color[0]);
        colorData.push(obj.color[1]);
        colorData.push(obj.color[2]);

        indexData.push(count);
    }

    createBuffersVIC(sceneObject, vertexPositionData, indexData, colorData);
    // On copie les autres données
    sceneObject.position = [0,0,0];
    sceneObject.colorVal = [1,0,0];
    sceneObject.primitive = gl.POINTS

    return sceneObject;
}
// ------------ Tracer ------------

