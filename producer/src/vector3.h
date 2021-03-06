/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*
**/
#ifndef BUTTER_VECTOR3_H
#define BUTTER_VECTOR3_H

#include "types.h"

namespace Tracer
{
	struct Vector3
	{
		float x,y,z;
	};
	// inline methods
		// Constructors
	inline Vector3 vector3(const float _x,const float _y, const float _z);
	inline Vector3 vector3(const float _v);

		// Operators
	inline Vector3 operator*(const Vector3& _v1, float parFactor);
	inline Vector3 operator*(const Vector3& _v1, const Vector3& _v2);
	inline Vector3 operator/(const Vector3& _v1, float parFactor);
	inline Vector3 operator+(const Vector3& _v1, const Vector3& _v2);
	inline Vector3 operator-(const Vector3& _v1, const Vector3& _v2);
	inline Vector3 operator-(const Vector3& _v1);

		// Cannonic operations
	inline float dotProd(const Vector3& _v1, const Vector3& _v2);
	inline Vector3 crossProd(const Vector3& _v1, const Vector3& _v2);
	inline float length(const Vector3& _v1);
	inline float length2(const Vector3& _v1);
	inline Vector3 normalize(const Vector3& _v1);

	// Default values;
	extern const Vector3 v3_ZERO;
	extern const Vector3 v3_X;
	extern const Vector3 v3_Y;
	extern const Vector3 v3_Z;
}

#include "vector3.ih"

#endif // BUTTER_VECTOR3_H
