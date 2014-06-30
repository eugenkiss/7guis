package sevenguis.flightbooker;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.reactfx.EventStream;

import java.time.LocalDate;

import static sevenguis.flightbooker.Util.*;
import static org.reactfx.EventStreams.*;

public class FlightBookerReactFX extends Application {

    public void start(Stage stage) {
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        // If I don't set flightType's value to return flight here,
        // the later setting to one-way flight is not picked up apparently...
        flightType.setValue("return flight");
        TextField startDate = new TextField();
        TextField returnDate = new TextField();
        Button book = new Button("Book");

        EventStream<Boolean> oneWay = valuesOf(flightType.valueProperty()).map(v -> v.equals("one-way flight"));
        EventStream<LocalDate> startDateDate = valuesOf(startDate.textProperty())
                .map(txt -> isDateString(txt) ? stringToDate(txt) : null);
        EventStream<LocalDate> returnDateDate = valuesOf(returnDate.textProperty())
                .map(txt -> isDateString(txt) ? stringToDate(txt) : null);
        EventStream<Boolean> startDateValid = startDateDate.map(v -> v != null);
        EventStream<Boolean> returnDateValid = returnDateDate.map(v -> v != null);
        EventStream<Boolean> dateRangeValid = combine(startDateDate, returnDateDate).map((s, r) ->
                s != null && r != null && s.compareTo(r) <= 0
        );
        EventStream<Boolean> datesValid = combine(oneWay, startDateValid, dateRangeValid)
                .map((o, s, r) -> o && s || r);

        oneWay.subscribe(returnDate::setDisable);
        startDateValid.map(v -> v ? "" : "-fx-background-color: lightcoral").subscribe(startDate::setStyle);
        returnDateValid.map(v -> v ? "" : "-fx-background-color: lightcoral").subscribe(returnDate::setStyle);
        datesValid.map(v -> !v).subscribe(book::setDisable);

        // It is very important to initialize the values of the widgets *after* the definition of the
        // functional dependencies due to combine's semantics!
        flightType.setValue("one-way flight");
        startDate.setText(dateToString(LocalDate.now()));
        returnDate.setText(dateToString(LocalDate.now()));

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
