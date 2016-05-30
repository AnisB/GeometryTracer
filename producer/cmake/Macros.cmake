cmake_minimum_required(VERSION 2.6)


MACRO(GENERATE_TEST SRC_FILE)
add_executable(${SRC_FILE} ${TEST}/${SRC_FILE})
include_directories(${SOURCES})
set_target_properties(${SRC_FILE} PROPERTIES FOLDER "Tests")
ENDMACRO()
