#ifndef TRACER_TYPES_H
#define TRACER_TYPES_H

namespace Tracer
{
	namespace TPrimitives
	{
		enum Type : int
		{
			UNKNOWN = 0,
			TRIANGLE = 1,
			LINE = 2,
			POINT = 3
		};
	}
}

#endif // TRACER_TYPES_H