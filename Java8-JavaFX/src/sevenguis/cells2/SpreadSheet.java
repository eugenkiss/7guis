package sevenguis.cells2;

import javafx.collections.ListChangeListener;
import javafx.collections.ObservableList;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.layout.HBox;

// Although Swing is worse in almost every respect compared to JavaFX its TableView
// was easier to customize to a spreadsheet than JavaFX's TableView.
// Caveat: You must never cancel an edit, i.e. always commit with enter. I tried and
// tried to make it work but its seems to me that there is a bug in JavaFX somewhere.
public class SpreadSheet extends HBox {

    public SpreadSheet(int height, int width) {
        super();
        Model model = new Model(height, width);

        TableView<ObservableList<Model.Cell>> table = new TableView<>();
        table.setEditable(true);
        table.setItems(model.getCellsAsObservableList());

        // The following is very very JavaFX specific.

        for (char w = 'A'; w < 'A'+width; w++) {
            TableColumn<ObservableList<Model.Cell>, String> column = new TableColumn<>(w+"");
            column.setSortable(false);
            column.setMinWidth(50);
            column.setCellFactory(TextFieldTableCell.forTableColumn());
            final char w0 = w;
            column.setCellValueFactory(param -> param.getValue().get(w0-'A').text);
            column.setOnEditStart(event -> {
                int row = event.getTablePosition().getRow();
                int col = event.getTablePosition().getColumn();
                Model.Cell c = model.getCells()[row][col];
                c.setShowUserData(true);
            });
            // A minefield of weird behavior...
            // Somehow changing the value of the text property of a cell here destroys the table.
//            column.setOnEditCancel(event -> {
//                Cell c = model.getCells()[ro][co];
//                c.setShowUserData(false);
//            });
            column.setOnEditCommit(event -> {
                int row = event.getTablePosition().getRow();
                int col = event.getTablePosition().getColumn();
                Model.Cell c = model.getCells()[row][col];
                c.userData.set(event.getNewValue());
                c.setShowUserData(false);
            });
            table.getColumns().add(column);
        }

        ListView<String> rowHeaders = new ListView<>();
        rowHeaders.getItems().add("");
        for (int i = 0; i < height; i++) rowHeaders.getItems().add(i+"");
        ScrollPane scrolledRowHeaders = new ScrollPane(rowHeaders);
        scrolledRowHeaders.setHbarPolicy(ScrollPane.ScrollBarPolicy.NEVER);
        scrolledRowHeaders.setVbarPolicy(ScrollPane.ScrollBarPolicy.NEVER);

        table.getChildrenUnmodifiable().addListener((ListChangeListener<Node>) c -> {
            ScrollBar vbarTable = (ScrollBar) table.lookup(".scroll-bar:vertical");
            ScrollBar vbarRowHeaders = (ScrollBar) scrolledRowHeaders.lookup(".scroll-bar:vertical");
            if (vbarRowHeaders != null && vbarTable != null)
                vbarTable.valueProperty().bindBidirectional(vbarRowHeaders.valueProperty());
        });

        getChildren().addAll(scrolledRowHeaders, table);
    }
}
