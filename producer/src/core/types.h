#ifndef TRACER_TYPES_H
#define TRACER_TYPES_H

// External includes
#include <stdint.h>

namespace Tracer
{
	namespace TPrimitives
	{
		enum Type : int32_t
		{
			UNKNOWN = 0,
			TRIANGLE = 1,
			LINE = 2,
			POINT = 3
		};
	}
}

#endif // TRACER_TYPES_H