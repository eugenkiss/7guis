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

    public void start(Stage stage) throws Exception{
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        flightType.setValue("one-way flight");
        TextField startDate = new TextField(dateToString(LocalDate.now()));
        TextField returnDate = new TextField(dateToString(LocalDate.now()));
        Button book = new Button("Book");

        returnDate.disableProperty().bind(flightType.valueProperty().isEqualTo("one-way flight"));
        // Ideally:
        //startDate.styleProperty().bind(
        //        new When(isDateString(startDate.getText())).then("")
        //                .otherwise("-fx-background-color: lightcoral"));
        startDate.styleProperty().bind(Bindings.createStringBinding(() ->
            isDateString(startDate.getText()) ? "" : "-fx-background-color: lightcoral"
        , startDate.textProperty()));
        // For comparison, a callback based approach
        returnDate.textProperty().addListener((v, o, n) ->
            returnDate.setStyle(isDateString(n) ? "" : "-fx-background-color: lightcoral"));
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
