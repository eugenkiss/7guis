package sevenguis.crud.fxml;

import javafx.application.Application;
import javafx.beans.binding.StringExpression;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import sevenguis.crud.FilterableView;

import java.util.ArrayList;
import java.util.List;

// TODO: Make it work
public class CRUDfxml extends Application {

    FilterableView filterableView;
    @FXML private ListView<String> entries;
    @FXML private TextField prefix;
    @FXML private Button update;
    @FXML private Button delete;
    @FXML private Label name;
    @FXML private Label surname;
    private StringExpression fullname;

    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("crud.fxml"));
        List<String> database = new ArrayList<>();
        database.add("Emil, Hans");
        database.add("Musterman, Max");
        database.add("Tisch, Roman");
        filterableView = new FilterableView(database);
//        entries.setItems(filterableView);

//        fullname = surname.textProperty().concat(", ").concat(name.textProperty());
//        prefix.textProperty().addListener((v, o, n) -> filterableView.filterByPrefix(n));
//        entries.getSelectionModel().selectedIndexProperty().addListener((v, o, n) -> {
//            update.setDisable(n.equals(-1));
//            delete.setDisable(n.equals(-1));
//        });

        stage.setScene(new Scene(root));
        stage.setTitle("CRUD");
        stage.show();
    }

    @FXML
    private void createAction(ActionEvent e) {
        filterableView.create(fullname.get());
    }

    @FXML
    private void deleteAction(ActionEvent e) {
        filterableView.delete(entries.getSelectionModel().getSelectedIndex());
    }

    @FXML
    private void updateAction(ActionEvent e) {
        filterableView.update(fullname.get(), entries.getSelectionModel().getSelectedIndex());
    }

    public static void main(String[] args) {
        launch(args);
    }

}

