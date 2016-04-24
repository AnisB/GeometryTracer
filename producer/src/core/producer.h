#ifndef TRACER_PRODUCER_H
#define TRACER_PRODUCER_H

// Library includes
#include "base/common.h"
#include "butter/types.h"

// External includes
#include <fstream>

namespace Tracer
{
	class TProducer
	{
	public:
		TProducer(const STRING_TYPE& _outputLocation, const STRING_TYPE& _outputFile);
		~TProducer();

		// Access methods
		void PushTriangle(const Vector3& _a, const Vector3& _b, const Vector3& _c);
		void PushLine(const Vector3& _a, const Vector3& _b);
		void PushPoint(const Vector3& _a);

	protected:
		// File tag
		STRING_TYPE m_outputLocation;
		STRING_TYPE m_tag;
		// The output binary file writer
		std::fstream m_fileStream;

	};
}

#endif // TRACER_PRODUCER_H