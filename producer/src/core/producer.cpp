// Library includes
#include "producer.h"
#include "types.h"


namespace Tracer
{
	TProducer::TProducer(const STRING_TYPE& _outputLocation, const STRING_TYPE& _tag)
	: m_outputLocation(_outputLocation)
	, m_tag(_tag)
	{
		STRING_TYPE outputFile = _outputLocation + "/" + _tag + ".trace";
		m_fileStream.open (outputFile, std::ios::out | std::ios::binary);
	}

	TProducer::~TProducer()
	{
		m_fileStream.close();
	}
	void TProducer::PushTriangle(const Vector3& _a, const Vector3& _b, const Vector3& _c)
	{
		int type = TPrimitives::TRIANGLE;
		m_fileStream.write ((const char*)&type, sizeof (int));
		m_fileStream.write ((const char*)&_a, 3*sizeof(double));
		m_fileStream.write ((const char*)&_b, 3*sizeof(double));
		m_fileStream.write ((const char*)&_c, 3*sizeof(double));
	}

	void TProducer::PushLine(const Vector3& _a, const Vector3& _b)
	{
		int type = TPrimitives::LINE;
		m_fileStream.write ((const char*)&type, sizeof (int));
		m_fileStream.write ((const char*)&_a, 3*sizeof(double));
		m_fileStream.write ((const char*)&_b, 3*sizeof(double));
	}
	
	void TProducer::PushPoint(const Vector3& _a)
	{
		int type = TPrimitives::POINT;
		m_fileStream.write ((const char*)&type, sizeof (int));
		m_fileStream.write ((const char*)&_a, 3*sizeof(double));
	}
}