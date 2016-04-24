// ------------ Tracer ------------
function readTextFile(parFilePath)
{
    var file = fopen(parFilePath, 0);
    if(file!=-1) 
    { 
        length = flength(file);
        str = fread(file, length);
        fclose(file);
        return str;
    }
    alert("Couldn't read file");
}   

// ------------ Tracer ------------
