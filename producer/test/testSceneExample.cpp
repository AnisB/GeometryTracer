// Library include
#include <core/producer.h>
#include <butter/vector3.h>

using namespace Tracer;
int main()
{
	TProducer manager(".", "sceneA");
	manager.PushTriangle(vector3(20, -20, -150), vector3(20, 20, -150), vector3(-20, -20, -150));
	return 0;
}