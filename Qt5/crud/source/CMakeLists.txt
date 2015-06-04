file(GLOB_RECURSE UI_FILES *.ui)
file(GLOB_RECURSE CODE_FILES *.cpp)

set(CMAKE_AUTOUIC ON)

add_executable(${CMAKE_PROJECT_NAME} WIN32
  ${UI_HEADERS}
  ${CODE_FILES}
  ${RESOURCE_FILES}
  ${WINDOWS_RES_FILE}
)

target_link_libraries(${CMAKE_PROJECT_NAME}
  Qt5::Widgets
)
