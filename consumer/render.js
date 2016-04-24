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
        //document.onkeydown = handleKeyDown;
        //document.onkeyup = handleKeyUp;
        //document.onmousemove = handleMouseMove;
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

function createBuffersVINT(parObj, parVertexList, parIndexList, parNormalList, parTexCoordList)
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

    var vertexNormalBuffer = gl.createBuffer();
    // On bind le VBO de normale
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    // On copie les données de normales sur le GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(parNormalList), gl.STATIC_DRAW);
    // 3 Données par normale
    vertexNormalBuffer.itemSize = 3;
    // Nombre de normales
    vertexNormalBuffer.numItems = parNormalList.length / 3;
    // On le copie dans la structure l'objet
    parObj.vertexNormalBuffer = vertexNormalBuffer;

    // Création du de coordonnées texture
    var vertexTextureCoordBuffer = gl.createBuffer();
    // On bind le VBO uv mapping
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    // On copie les données de texcoord sur le GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(parTexCoordList), gl.STATIC_DRAW);
    // 2 données par tex coord
    vertexTextureCoordBuffer.itemSize = 2;
    // Nombre de tex coord
    vertexTextureCoordBuffer.numItems = parTexCoordList.length / 2;
    // On le copie dans la strcture de l'objet
    parObj.vertexTextureCoordBuffer = vertexTextureCoordBuffer;
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


// Creation d'un plan
function BuildSceneObjectFromTriangleList()
{
    // Données de sphere
    var sceneObject = [];
    // Données  attribute
    var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];
    var indexData = [];

    var nbprimtives = 1
    for(var count = 0; count < nbprimtives; ++count)
    {
        var obj = primitives[count]
        vertexPositionData.push(obj.p0[0]);
        vertexPositionData.push(obj.p0[1]);
        vertexPositionData.push(obj.p0[2]);

        vertexPositionData.push(obj.p1[0]);
        vertexPositionData.push(obj.p1[1]);
        vertexPositionData.push(obj.p1[2]);

        vertexPositionData.push(obj.p2[0]);
        vertexPositionData.push(obj.p2[1]);
        vertexPositionData.push(obj.p2[2]);

        textureCoordData.push(0);
        textureCoordData.push(0);

        textureCoordData.push(0);
        textureCoordData.push(0);
    
        textureCoordData.push(0);
        textureCoordData.push(0);
    
        var norm = computeTriangleNormal(obj.p0, obj.p1, obj.p2);
        normalData.push(norm[0]);
        normalData.push(norm[1]);
        normalData.push(norm[2]);

        normalData.push(norm[0]);
        normalData.push(norm[1]);
        normalData.push(norm[2]);

        normalData.push(norm[0]);
        normalData.push(norm[1]);
        normalData.push(norm[2]);

        indexData.push(0);
        indexData.push(1);
        indexData.push(2);
    }

    createBuffersVINT(sceneObject, vertexPositionData, indexData, normalData, textureCoordData);
    // On copie les autres données
    sceneObject.position = [0,0,0];
    sceneObject.colorVal = [1,0,0];

    return sceneObject;
}
// ------------ Tracer ------------

