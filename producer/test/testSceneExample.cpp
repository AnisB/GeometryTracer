// Library include
#include <producer.h>
#include <vector3.h>

using namespace Tracer;
int main()
{
	TProducer manager(".", "sceneA");
	
	// Front face
	manager.PushTriangle(vector3(20, -20, -150), vector3(20, 20, -150), vector3(-20, -20, -150));
	manager.PushTriangle(vector3(-20, -20, -150), vector3(20, 20, -150), vector3(-20, 20, -150));
	
	// Back face
	manager.PushTriangle(vector3(20, -20, -190), vector3(-20, -20, -190), vector3(20, 20, -190));
	manager.PushTriangle(vector3(-20, -20, -190), vector3(-20, 20, -190), vector3(20, 20, -190));

	// Right face
	manager.PushTriangle(vector3(-20, -20, -150), vector3(-20, -20, -190),vector3(-20, 20, -150));
	manager.PushTriangle(vector3(-20, -20, -190), vector3(-20, 20, -190),vector3(-20, 20, -150));

	// Left face
	manager.PushTriangle(vector3(20, -20, -150), vector3(20, 20, -150),vector3(20, -20, -190));
	manager.PushTriangle(vector3(20, -20, -190), vector3(20, 20, -150), vector3(20, 20, -190));
	
	// Top face
	manager.PushTriangle(vector3(20, 20, -150), vector3(20, 20, -190),vector3(-20, 20, -150));
	manager.PushTriangle(vector3(-20, 20, -150), vector3(-20, 20, -190), vector3(20, 20, -190));
	
	// Bottom face
	manager.PushTriangle(vector3(20, -20, -150), vector3(-20, -20, -150), vector3(20, -20, -190));
	manager.PushTriangle(vector3(-20, -20, -150), vector3(20, -20, -190), vector3(-20, -20, -190));

	return 0;
}