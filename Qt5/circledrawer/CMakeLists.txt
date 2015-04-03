cmake_minimum_required(VERSION 2.8.11)

if (NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release CACHE STRING
      "None Debug Release RelWithDebInfo MinSizeRel"
      FORCE)
endif()

project(circledrawer)
set(PROJECT_LONGNAME "Circle Drawer")

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt5Widgets REQUIRED)

if (NOT MSVC)
  set(CMAKE_CXX_FLAGS ${CMAKE_CXX_FLAGS} -std=c++11)
endif()

add_subdirectory(source)
