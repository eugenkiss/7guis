package sevenguis.flightbooker;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;

import java.time.LocalDate;

import static sevenguis.flightbooker.Util.*;

public class FlightBookerReactFX extends Application {

    public void start(Stage stage) {
        ComboBox<String> flightType = new ComboBox<>();
        flightType.getItems().addAll("one-way flight", "return flight");
        TextField startDate = new TextField(dateToString(LocalDate.now()));
        TextField returnDate = new TextField(dateToString(LocalDate.now()));
        Button book = new Button("Book");

        // We see that a cousin of FRP like ReactFX is not suited for the expression
        // of functional dependencies. Their strengths lie elsewhere.
        EventStream<String> flightTypeStream = EventStreams.valuesOf(flightType.valueProperty());
        EventStream<String> startDateStream = EventStreams.valuesOf(startDate.textProperty());
        EventStream<String> returnDateStream = EventStreams.valuesOf(returnDate.textProperty());
        returnDate.disableProperty().bind(
                flightTypeStream.map("one-way flight"::equals).toBinding(true));
        // Using binding support of ReactFX
        startDate.styleProperty().bind(startDateStream.map( s ->
                isDateString(startDate.getText()) ? "" : "-fx-background-color: lightcoral"
                ).toBinding(""));
        // Alternatively,  with inversion of control a la callback
        returnDateStream.map(s ->
                isDateString(startDate.getText()) ? "" : "-fx-background-color: lightcoral"
                ).subscribe(returnDate::setStyle);
        // Combinators come into play (iov) (somewhat similar to Seesaw's funneling)
        EventStreams.combine(flightTypeStream, startDateStream, returnDateStream).map((f, s, r) -> {
            if ("one-way flight".equals(f)) {
                return !isDateString(s);
            } else {
                return !isDateString(s) ||
                       !isDateString(r) ||
                       stringToDate(s).compareTo(stringToDate(r)) > 0;
            }
        }).subscribe(book::setDisable);
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
