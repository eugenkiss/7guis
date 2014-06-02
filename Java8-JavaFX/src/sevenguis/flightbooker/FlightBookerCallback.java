package sevenguis.flightbooker;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.value.ChangeListener;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.time.LocalDate;

import static sevenguis.flightbooker.Util.*;

public class FlightBookerCallback extends Application {

    public void start(Stage stage) {
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        TextField startDate = new TextField(dateToString(LocalDate.now()));
        TextField returnDate = new TextField(dateToString(LocalDate.now()));
        Button book = new Button("Book");

        // A lot of inversion of control but in parts even terser than the "right" solution.
        flightType.valueProperty().addListener((v, o, n) ->
                returnDate.setDisable(n.equals("one-way flight")));
        startDate.textProperty().addListener((v, o, n) ->
                startDate.setStyle(isDateString(n) ? "" : "-fx-background-color: lightcoral"));
        returnDate.textProperty().addListener((v, o, n) ->
            returnDate.setStyle(isDateString(n) ? "" : "-fx-background-color: lightcoral"));
        ChangeListener<String> bookEnabledAction = (v, o, n) -> {
            if (flightType.getValue().equals("one-way flight")) {
                book.setDisable(!isDateString(startDate.getText()));
            } else {
                book.setDisable(
                        !isDateString(startDate.getText()) ||
                        !isDateString(returnDate.getText()) ||
                        stringToDate(startDate.getText()).compareTo(stringToDate(returnDate.getText())) > 0);
            }
        };
        flightType.valueProperty().addListener(bookEnabledAction);
        startDate.textProperty().addListener(bookEnabledAction);
        returnDate.textProperty().addListener(bookEnabledAction);
        // It is important to set the value after the initializations of the callbacks.
        flightType.setValue("one-way flight");

        VBox root = new VBox(10, flightType, startDate, returnDate, book);
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Flight Booker");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
