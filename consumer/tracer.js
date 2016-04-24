// ------------ Tracer ------------
var TPrimitives = {
	UNKNOWN : 0,
	TRIANGLE: 1,
	LINE: 2,
	POINT: 3
};

function readInt(_buffer, shift)
{
    return (new Int32Array(_buffer, shift*4, 1)[0]);
}

function readVec3(_buffer, shift)
{
    var data = new Float32Array(_buffer, shift*4, 3);
    var v1 = vec3.create();
    v1[0] = data[0];
    v1[1] = data[1];
    v1[2] = data[2];
    return v1;
}

function CreateTriangle(_buffer, shift)
{
    var triangle = [];
    triangle.p0 = readVec3(_buffer, shift);
    triangle.p1 = readVec3(_buffer, shift + 3);
    triangle.p2 = readVec3(_buffer, shift + 6);
    triangle.type = TPrimitives.TRIANGLE;
    return triangle;
}

function CreateLine(_buffer, shift)
{
    var line = [];
    line.p0 = readVec3(_buffer, shift);
    line.p1 = readVec3(_buffer, shift + 3);
    line.type = TPrimitives.LINE;
    return line;
}

function CreatePoint(_buffer, shift)
{
    var point = [];
    point.p0 = readVec3(_buffer, shift);
    point.type = TPrimitives.POINT;
    return point;
}

function ParseBinaryTrace(contents) 
{ 
    var nbValues = contents.byteLength;

    var shiftCounter = 0;
    while((shiftCounter * 4) < nbValues)
    {
        var primitive = readInt(contents, shiftCounter);
        shiftCounter += 1;
        if(primitive == TPrimitives.TRIANGLE)
        {
            var triangle = CreateTriangle(contents, shiftCounter);
            primitives.push(triangle);
            shiftCounter += 9;
        }
        else if(primitive ==  TPrimitives.LINE)
        {
            (CreateLine(contents, shiftCounter));
            shiftCounter += 6;
        }
        else if(primitive ==  TPrimitives.POINT)
        {
            (CreatePoint(contents, shiftCounter));
            shiftCounter+= 3;
        }
        else
        {
            document.write("UNKOWN");
        }
    }
}
// ------------ Tracer ------------