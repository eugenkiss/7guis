package sevenguis.flightbooker;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.binding.When;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.value.ChangeListener;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.time.LocalDate;
import java.util.concurrent.Callable;

import static sevenguis.flightbooker.Util.*;

public class FlightBooker extends Application {

    public void start(Stage stage) {
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        flightType.setValue("one-way flight");
        TextField startDate = new TextField(dateToString(LocalDate.now()));
        TextField returnDate = new TextField(dateToString(LocalDate.now()));
        Button book = new Button("Book");

        returnDate.disableProperty().bind(flightType.valueProperty().isEqualTo("one-way flight"));
        startDate.styleProperty().bind(Bindings.createStringBinding(() ->
                isDateString(startDate.getText()) ? "" : "-fx-background-color: lightcoral"
                , startDate.textProperty()));
        returnDate.styleProperty().bind(Bindings.createStringBinding(() ->
                isDateString(returnDate.getText()) ? "" : "-fx-background-color: lightcoral"
                , returnDate.textProperty()));
        book.disableProperty().bind(Bindings.createBooleanBinding(() -> {
            if (flightType.getValue().equals("one-way flight")) {
                return !isDateString(startDate.getText());
            } else {
                return !isDateString(startDate.getText()) ||
                       !isDateString(returnDate.getText()) ||
                       stringToDate(startDate.getText()).compareTo(stringToDate(returnDate.getText())) > 0;
            }
        }, flightType.valueProperty(), startDate.textProperty(), returnDate.textProperty()));

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
