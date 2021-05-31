import QtQuick 2.2
import QtQuick.Controls 1.2
import QtQuick.Layouts 1.1
import QtQuick.Window 2.2

Window {
    id: counterWindow
    width: 200
    height: 100
    visible: true

    property int counter: 0

    RowLayout {
        anchors.fill: parent
        spacing: 6

        Label {
            text: counterWindow.counter
        }

        Button {
            text: "Increment"
            onClicked: ++counterWindow.counter
        }
    }
}

