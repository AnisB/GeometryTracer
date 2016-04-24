// Library include
#include <core/producer.h>
#include <butter/vector3.h>

using namespace Tracer;
int main()
{
	TProducer manager(".", "sceneA");
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));
	manager.PushTriangle(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0), vector3(0.0, 1.0, 1.0));


	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));
	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));
	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));
	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));
	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));
	manager.PushLine(vector3(0.0, 1.0, 0.0), vector3(1.0, 1.0, 0.0));


	manager.PushPoint(vector3(0.0, 1.0, 0.0));
	manager.PushPoint(vector3(0.0, 1.0, 0.0));
	manager.PushPoint(vector3(0.0, 1.0, 0.0));
	manager.PushPoint(vector3(0.0, 1.0, 0.0));
	manager.PushPoint(vector3(0.0, 1.0, 0.0));
	manager.PushPoint(vector3(0.0, 1.0, 0.0));

	return 0;
}