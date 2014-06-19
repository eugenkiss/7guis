package sevenguis.counter;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;

// https://gist.github.com/TomasMikula/d0c5bd845b2a5db32cd2
public class CounterReactFX extends Application {

    public void start(Stage stage) {
        TextField count = new TextField("0");
        count.setEditable(false);
        count.setPrefWidth(50);
        Button countUp = new Button("Count");

//        EventStream<MouseEvent> clicks = EventStreams.eventsOf(countUp, MouseEvent.MOUSE_CLICKED);
//        clicks.subscribe(click -> count.setText(1+Integer.parseInt(count.getText())+""));

        EventStream<MouseEvent> clicks = EventStreams.eventsOf(countUp, MouseEvent.MOUSE_CLICKED);
        EventStream<Integer> summed = clicks.accumulate(0, (n, x) -> n + 1);
        summed.subscribe(v -> count.textProperty().setValue(v.toString()));

        HBox root = new HBox(10, count, countUp);
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Counter");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
