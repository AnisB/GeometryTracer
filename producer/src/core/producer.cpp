// Library includes
#include "producer.h"
#include "types.h"


namespace Tracer
{
	TProducer::TProducer(const STRING_TYPE& _outputLocation, const STRING_TYPE& _tag)
	: m_outputLocation(_outputLocation)
	, m_tag(_tag)
	, m_counter(0)
	{
		STRING_TYPE outputFile = _outputLocation + "/" + _tag + ".trace";
		m_fileStream.open (outputFile, std::ios::out | std::ios::binary);
	}

	TProducer::~TProducer()
	{
		std::cout<<"File contains "<<m_counter<<std::endl;
		m_fileStream.close();
	}
	void TProducer::PushTriangle(const Vector3& _a, const Vector3& _b, const Vector3& _c)
	{
		int type = TPrimitives::TRIANGLE;
		m_counter += 10;
		m_fileStream.write ((const char*)&type, sizeof (int32_t));
		m_fileStream.write ((const char*)&_a, 3*sizeof(float));
		m_fileStream.write ((const char*)&_b, 3*sizeof(float));
		m_fileStream.write ((const char*)&_c, 3*sizeof(float));
	}

	void TProducer::PushCube(const Vector3& _pos, double _dimension)
	{
		int type = TPrimitives::CUBE;
		m_counter += 5;
		m_fileStream.write ((const char*)&type, sizeof (int32_t));
		m_fileStream.write ((const char*)&_pos, 3*sizeof(float));
		m_fileStream.write ((const char*)&_dimension, sizeof(float));
	}

	void TProducer::PushLine(const Vector3& _a, const Vector3& _b)
	{
		int type = TPrimitives::LINE;
		m_counter += 7;
		m_fileStream.write ((const char*)&type, sizeof (int32_t));
		m_fileStream.write ((const char*)&_a, 3*sizeof(float));
		m_fileStream.write ((const char*)&_b, 3*sizeof(float));
	}
	
	void TProducer::PushPoint(const Vector3& _a)
	{
		int type = TPrimitives::POINT;
		m_counter += 4;
		m_fileStream.write ((const char*)&type, sizeof (int32_t));
		m_fileStream.write ((const char*)&_a, 3*sizeof(float));
	}
}