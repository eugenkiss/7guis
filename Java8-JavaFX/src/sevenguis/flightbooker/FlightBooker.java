package sevenguis.flightbooker;

import javafx.application.Application;
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

public class FlightBooker extends Application {

    public void start(Stage stage) throws Exception{
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        TextField startDate = new TextField(dateToString(LocalDate.now()));
        TextField returnDate = new TextField(dateToString(LocalDate.now()));
        Button book = new Button("Book");

        startDate.textProperty().addListener((v, o, n) ->
                startDate.setStyle(isDateString(n) ? "" : "-fx-background-color: lightcoral"));
        returnDate.textProperty().addListener((v, o, n) ->
                returnDate.setStyle(isDateString(n) ? "" : "-fx-background-color: lightcoral"));
        flightType.valueProperty().addListener((v, o, n) -> returnDate.setDisable(n.equals("one-way flight")));
        ChangeListener bookEnabledAction = (v, o, n) -> {
            switch (flightType.getValue()) {
            case "one-way flight": book.setDisable(!isDateString(startDate.getText()));
            case "return flight":  book.setDisable(
                    !isDateString(startDate.getText()) ||
                    !isDateString(returnDate.getText()) ||
                    stringToDate(startDate.getText()).compareTo(stringToDate(returnDate.getText())) > 0);
            }
        };
        flightType.valueProperty().addListener(bookEnabledAction);
        startDate.textProperty().addListener(bookEnabledAction);
        returnDate.textProperty().addListener(bookEnabledAction);
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
