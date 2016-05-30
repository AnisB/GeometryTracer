#ifndef TRACER_PRODUCER_H
#define TRACER_PRODUCER_H

// Library includes
#include "vector3.h"

// External includes
#include <string.h>
#include <fstream>
#include <iostream>

namespace Tracer
{
	class TProducer
	{
	public:
		inline TProducer(const std::string& _outputLocation, const std::string& _tag)
		: m_outputLocation(_outputLocation)
		, m_tag(_tag)
		, m_counter(0)
		{
			srand(666);
			m_currentColor = vector3(1.0, 0.0, 0.0);
			std::string outputFile = _outputLocation + "/" + _tag + ".trace";
			m_fileStream.open(outputFile, std::ios::out | std::ios::binary);
		}

		inline TProducer::~TProducer()
		{
			std::cout << "File contains " << m_counter << std::endl;
			m_fileStream.close();
		}

		// Access methods
		inline void PushTriangle(const Vector3& _a, const Vector3& _b, const Vector3& _c)
		{
			int type = TPrimitives::TRIANGLE;
			m_counter += 13;
			m_fileStream.write((const char*)&type, sizeof(int32_t));
			m_fileStream.write((const char*)&_a, 3 * sizeof(float));
			m_fileStream.write((const char*)&_b, 3 * sizeof(float));
			m_fileStream.write((const char*)&_c, 3 * sizeof(float));
			m_fileStream.write((const char*)&m_currentColor, 3 * sizeof(float));
		}

		inline void PushCube(const Vector3& _pos, double _dimension)
		{
			int type = TPrimitives::CUBE;
			m_counter += 8;
			m_fileStream.write((const char*)&type, sizeof(int32_t));
			m_fileStream.write((const char*)&_pos, 3 * sizeof(float));
			m_fileStream.write((const char*)&_dimension, sizeof(float));
			m_fileStream.write((const char*)&m_currentColor, 3 * sizeof(float));
		}

		inline void PushLine(const Vector3& _a, const Vector3& _b)
		{
			int type = TPrimitives::LINE;
			m_counter += 10;
			m_fileStream.write((const char*)&type, sizeof(int32_t));
			m_fileStream.write((const char*)&_a, 3 * sizeof(float));
			m_fileStream.write((const char*)&_b, 3 * sizeof(float));
			m_fileStream.write((const char*)&m_currentColor, 3 * sizeof(float));
		}

		inline void PushPoint(const Vector3& _a)
		{
			int type = TPrimitives::POINT;
			m_counter += 7;
			m_fileStream.write((const char*)&type, sizeof(int32_t));
			m_fileStream.write((const char*)&_a, 3 * sizeof(float));
			m_fileStream.write((const char*)&m_currentColor, 3 * sizeof(float));
		}

		inline void NewObject()
		{
			m_currentColor.x = normalizedRandom();
			m_currentColor.y = normalizedRandom();
			m_currentColor.z = normalizedRandom();
		}
	private:
		static float normalizedRandom()
		{
			return (rand() / (float)RAND_MAX);
		}
	protected:
		// File tag
		std::string m_outputLocation;
		std::string m_tag;

		// Nb 32 bit values counter
		size_t m_counter;
		
		// outputing data
		Vector3 m_currentColor;

		// The output binary file writer
		std::fstream m_fileStream;
	};
}

#endif // TRACER_PRODUCER_H