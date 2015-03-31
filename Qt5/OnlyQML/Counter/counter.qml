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
        id: layout
        anchors.fill: parent
        spacing: 6
        Label {
            id: theCount
            text: String(counterWindow.counter)
        }

        Button {
            id: theButton
            text: "Increment"
            onClicked: theCount.text = String(++counterWindow.counter)
        }
    }
}

