cmake_minimum_required(VERSION 3.1)
project(Counter)

find_package(Qt5 REQUIRED COMPONENTS Core Widgets)

add_executable(Counter ${CMAKE_CURRENT_SOURCE_DIR}/counter.cpp)
set_property(TARGET Counter PROPERTY CXX_STANDARD 11)

target_link_libraries(Counter Qt5::Core Qt5::Widgets)
