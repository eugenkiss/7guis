package sevenguis.cells;

import javafx.collections.ListChangeListener;
import javafx.collections.ObservableList;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.layout.HBox;

public class SpreadSheet extends HBox {

    public SpreadSheet(int height, int width) {
        super();
        Model model = new Model(height, width);

        TableView<ObservableList<Cell>> table = new TableView<>();
        table.setEditable(true);
        table.setItems(model.getCellsAsObservableList());

        for (char w = 'A'; w < 'A'+width; w++) {
            TableColumn<ObservableList<Cell>, String> column = new TableColumn<>(w+"");
            column.setSortable(false);
            column.setMinWidth(50);
            column.setCellFactory(TextFieldTableCell.forTableColumn());
            final char w0 = w;
            column.setCellValueFactory(param -> param.getValue().get(w0-'A').textProperty());
            column.setOnEditCommit(event -> {
                event.getNewValue();
                Formula formula = null;
                try {
                    formula = Parser.parse(event.getNewValue());
                } catch (Exception e) {
                    formula = new Textual(e.getMessage());
                }
                int row = event.getTablePosition().getRow();
                int col = event.getTablePosition().getColumn();
                model.getCells()[row][col].setFormula(formula);
            });
            table.getColumns().add(column);
        }

        ListView<String> rowHeaders = new ListView<>();
        rowHeaders.getItems().add("");
        for (int i = 0; i < height; i++) {
            rowHeaders.getItems().add(i+"");
        }
        rowHeaders.setMinWidth(60);
        ScrollPane scrolledRowHeaders = new ScrollPane(rowHeaders);
        scrolledRowHeaders.setFitToHeight(true);
        scrolledRowHeaders.setFitToWidth(true);
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
