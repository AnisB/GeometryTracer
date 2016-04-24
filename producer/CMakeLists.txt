cmake_minimum_required(VERSION 3.0.2)

project(GeometryTracer)

set_property(GLOBAL PROPERTY USE_FOLDERS ON)

IF(SILENT)
add_definitions( -D _SILENT )
ENDIF(SILENT)

set(CMAKE_C_FLAGS_DEBUG "-D_DEBUG")
set(CMAKE_CXX_FLAGS_DEBUG "-D_DEBUG")

# Setting the compiler data
set(CMAKE_BUILD_TYPE "Debug")
IF (NOT WIN32)
add_definitions(-std=c++11) 
SET(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")
ENDIF()

# Setting the folder data
set(SOURCES "${PROJECT_SOURCE_DIR}/src/")
set(TEST "${PROJECT_SOURCE_DIR}/test/")

include("${PROJECT_SOURCE_DIR}/cmake/Macros.cmake")

# Setting the needs
IF(UNIX AND NOT APPLE)
add_definitions( -D__posix__ )
add_definitions( -D LINUX )
ENDIF()

IF(APPLE)
  add_definitions( -DMACOSX )
  add_definitions( -D__posix__ )
ENDIF (APPLE)

IF(WIN32)
add_definitions( -DWIN32 )
set(CMAKE_CXX_FLAGS_DEBUG "/MDd /Zi")
ENDIF()

# Generating the libraries
GENERATE_LIB("${SOURCES}/base" Base "GeometryProducer")
GENERATE_LIB("${SOURCES}/butter" Butter "GeometryProducer")
GENERATE_LIB("${SOURCES}/core" Core "GeometryProducer")

SET(CORELIBS ${CORELIBS} Base Butter Core)

# Adding the tests if we should
IF(NO_TESTS)
ELSE(NO_TESTS)
add_subdirectory(${TEST})
ENDIF(NO_TESTS)


 


