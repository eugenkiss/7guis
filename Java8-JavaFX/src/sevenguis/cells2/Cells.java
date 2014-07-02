package sevenguis.cells2;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Cells extends Application {

    public void start(Stage stage) {
        stage.setScene(new Scene(new SpreadSheet(100, 26)));
        stage.setTitle("Cells");
        stage.setWidth(400);
        stage.setHeight(400);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

}
