// ------------ Tracer ------------
// Fonction shader
// Vérification shader
function checkShader(parShader)
{
    if (!gl.getShaderParameter(parShader, gl.COMPILE_STATUS)) 
    {
        alert(gl.getShaderInfoLog(parShader));
    }
}

// Verification du programme
function checkProgram(parProgram)
{
    if (!gl.getProgramParameter(parProgram, gl.LINK_STATUS)) 
    {
        alert("Could not initialise shaders");
    }
}

// Compilation shader
function compileShader(gl, id, parShaderType) 
{
    // Récupération du shader dans la page html
    var shaderScript = document.getElementById(id);
    // ON vérifie qu'il a été trouvé
    if (!shaderScript) 
    {
        alert("Shader "+id+" non trouvé!");
        return null;
    }
    var str = "";
    var k = shaderScript.firstChild;
    while (k) 
    {
        if (k.nodeType == 3) 
        {
            str += k.textContent;
        }
        k = k.nextSibling;
    }
    //On crée le shader
    var shader = gl.createShader(parShaderType);
    // ON charge
    gl.shaderSource(shader, str);
    // On compile
    gl.compileShader(shader);
    // On vérifie
    checkShader(shader);
    return shader;
}   


// Inits
function generateProgram(parVertex, parFragment) 
{
    // Compilation fragment shader
    var fragmentShader = compileShader(gl, parVertex, gl.VERTEX_SHADER);
    // Compilation du vertex shader
    var vertexShader = compileShader(gl, parFragment, gl.FRAGMENT_SHADER);
    // On crée le programme
    var shaderProg = gl.createProgram();
    // On attache le vertex shader
    gl.attachShader(shaderProg, vertexShader);
    // On attache le fragment shader
    gl.attachShader(shaderProg, fragmentShader);
    // On link le programme
    gl.linkProgram(shaderProg);
    // On vérifie le programme
    checkProgram(shaderProg);
    //On utilise le programme
    gl.useProgram(shaderProg);
    // retourn les données
    return shaderProg;
}

function bindProgram(parShader)
{
    gl.useProgram(parShader);
}

function unbindProgram()
{
    gl.useProgram(null);
}


function injectMatrix(parProgam, parMatrixName, parMatrix)
{
    // Recuperation de l'id
    var matrixID =  gl.getUniformLocation(parProgam, parMatrixName);
    // Injection de la matrix
    gl.uniformMatrix4fv(matrixID, false, parMatrix);
}


function injectVec3(parProgam, parVec3Name, parVec3)
{
    // Recuperation de l'id
    var vecID =  gl.getUniformLocation(parProgam, parVec3Name);
    // Injection du vec3
    gl.uniform3fv(vecID, false, parVec3);
}

function injectVec4(parProgam, parVec4Name, parVec4)
{
    // Recuperation de l'id
    var vecID =  gl.getUniformLocation(parProgam, parVec4Name);
    // Injection du vec4
    gl.uniform3fv(vecID, false, parVec4);
}

// ------------ Tracer ------------