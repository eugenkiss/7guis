package sevenguis.crud;

import javafx.application.Application;
import javafx.beans.binding.IntegerExpression;
import javafx.beans.binding.StringExpression;
import javafx.collections.FXCollections;
import javafx.collections.ListChangeListener;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.List;

public class CRUD extends Application {

    public void start(Stage stage) {
        TextField prefix = new TextField();
        prefix.setPrefWidth(60);
        TextField name = new TextField();
        name.setPrefWidth(100);
        TextField surname = new TextField();
        surname.setPrefWidth(100);
        Button create = new Button("Create");
        Button update = new Button("Update");
        Button delete = new Button("Delete");
        update.setDisable(true);
        delete.setDisable(true);
        ListView<String> entries = new ListView<>();
        entries.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);

        List<String> externDb = new ArrayList<>();
        externDb.add("Emil, Hans");
        externDb.add("Musterman, Max");
        externDb.add("Tisch, Roman");
        ObservableList<String> db = FXCollections.observableArrayList(externDb);
        db.addListener((ListChangeListener<String>) c -> {
            while (c.next()) {
                if (c.wasReplaced()) externDb.set(c.getFrom(), c.getAddedSubList().get(0));
                else {
                    if (c.wasAdded()) externDb.add(c.getAddedSubList().get(0));
                    if (c.wasRemoved()) externDb.remove(c.getFrom());
                }
            }
        });
        FilteredList<String> dbView = db.filtered(item -> true);
        entries.setItems(dbView);

        StringExpression fullname = surname.textProperty().concat(", ").concat(name.textProperty());
        IntegerExpression selectedIndex = entries.getSelectionModel().selectedIndexProperty();
        prefix.textProperty().addListener((v, o, n) -> dbView.setPredicate(item -> item.startsWith(n)));
        create.setOnAction(e -> db.add(fullname.get()));
        delete.setOnAction(e -> db.remove(dbView.getSourceIndex(selectedIndex.get())));
        update.setOnAction(e -> db.set(dbView.getSourceIndex(selectedIndex.get()), fullname.get()));
        delete.disableProperty().bind(selectedIndex.isEqualTo(-1));
        update.disableProperty().bind(selectedIndex.isEqualTo(-1));

        BorderPane root = new BorderPane();
        root.setPrefSize(400, 400);
        root.setPadding(new Insets(10));
        HBox top = new HBox(10, new Label("Filter prefix: "), prefix);
        top.setPadding(new Insets(0, 0, 10, 0));
        top.setAlignment(Pos.BASELINE_LEFT);
        root.setTop(top);
        root.setCenter(entries);
        GridPane right = new GridPane();
        right.setHgap(10);
        right.setVgap(10);
        right.setPadding(new Insets(0, 0, 0, 10));
        right.addRow(0, new Label("Name: "), name);
        right.addRow(1, new Label("Surname: "), surname);
        root.setRight(right);
        HBox bottom = new HBox(10, create, update, delete);
        bottom.setPadding(new Insets(10, 0, 0, 0));
        root.setBottom(bottom);

        stage.setScene(new Scene(root));
        stage.setTitle("CRUD");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

