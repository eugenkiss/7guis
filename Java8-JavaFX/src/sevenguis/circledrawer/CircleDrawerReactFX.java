package sevenguis.circledrawer;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.stage.Popup;
import javafx.stage.Stage;
import org.reactfx.EventSource;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;
import sevenguis.circledrawer.undo.UndoManager;
import sevenguis.circledrawer.undo.UndoableEdit;

import java.util.ArrayList;
import java.util.List;

public class CircleDrawerReactFX extends Application {

    public void start(Stage stage) {
        Button undo = new Button("Undo");
        Button redo = new Button("Redo");
        CircleDrawerCanvasReactFX canvas = new CircleDrawerCanvasReactFX();

        undo.setOnAction(e -> canvas.undo());
        redo.setOnAction(e -> canvas.redo());

        BorderPane root = new BorderPane();
        root.setPadding(new Insets(10));
        HBox top = new HBox(10, undo, redo);
        top.setPadding(new Insets(0, 0, 10, 0));
        root.setTop(top);
        root.setCenter(canvas);

        stage.setScene(new Scene(root));
        stage.setTitle("Counter");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

class CircleDrawerCanvasReactFX extends Canvas {

    private List<Circle> circles;
    private Circle hovered;
    private UndoManager undoManager;

    public CircleDrawerCanvasReactFX() {
        super(400, 400);
        circles = new ArrayList<>();
        undoManager = new UndoManager();

        // The following is not enough as I have to be able to manually
        // push into mouseMovedStream inside setOnMousePressed.
        //EventStream<MouseEvent> mouseMovedStream = EventStreams.eventsOf(this, MouseEvent.MOUSE_MOVED);
        EventSource<MouseEvent> mouseMovedStream = new EventSource<>();
        EventStreams.eventsOf(this, MouseEvent.MOUSE_MOVED).subscribe(mouseMovedStream::push);
        EventStream<Circle> hoveredStream = mouseMovedStream.map(moved -> getNearestCircleAt((int) moved.getX(), (int) moved.getY()));
        hoveredStream.subscribe(c -> hovered = c);
        hoveredStream.subscribe(c -> draw());

        Button diameterEntry = new Button("Diameter...");
        Popup popup = new Popup();
        popup.getContent().add(diameterEntry);

        diameterEntry.setOnAction(e -> {
            popup.hide();
            showDialog(hovered);
        });
        setOnMousePressed((MouseEvent e) -> {
            if (e.isPrimaryButtonDown() && hovered == null) {
                addCircle(new Circle((int) e.getX(), (int) e.getY()));
                // Another change
                mouseMovedStream.push(e);
            }
            if (popup.isShowing()) popup.hide();
            if (e.isPopupTrigger() && hovered != null)
                popup.show(this, e.getScreenX(), e.getScreenY());
        });
        draw();
    }

    void draw() {
        GraphicsContext g = getGraphicsContext2D();
        g.setFill(Color.WHITE);
        g.setStroke(Color.BLACK);
        g.fillRect(0, 0, getWidth(), getHeight());
        g.strokeRect(0, 0, getWidth(), getHeight());

        g.setFill(Color.LIGHTGRAY);
        for (Circle c : circles) {
            int offset = c.getDiameter() / 2;
            if (c.equals(hovered)) {
                g.fillOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
            }
            g.strokeOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
        }
    }

    void addCircle(Circle circle) {
        undoManager.addEdit(new CreateCircleEdit(circle));
        circles.add(circle);
    }

    public Circle getNearestCircleAt(int x, int y) {
        Circle circle = null;
        double minDist = Double.MAX_VALUE;
        for (Circle c : circles) {
            double d = Math.sqrt(Math.pow(x - c.getX(), 2) + Math.pow(y - c.getY(), 2));
            if (d <= c.getDiameter()/2 && d < minDist) {
                circle = c;
                minDist = d;
            }
        }
        return circle;
    }

    // TODO
    void showDialog(Circle selected) {
        Stage dialog = new Stage();
        Label info = new Label(String.format("Adjust diameter of circle at (%s, %s)",
                selected.getX(), selected.getY()));
        Slider slider = new Slider(10, 50, selected.getDiameter());
        VBox content = new VBox(10, info, slider);
        content.setPadding(new Insets(10));
        dialog.setScene(new Scene(content));
        dialog.show();

        slider.valueProperty().addListener((v, o, n) -> {
            selected.setDiameter(n.intValue());
            draw();
        });
        int oldDiameter = selected.getDiameter();
        dialog.setOnCloseRequest(e -> undoManager.addEdit(
                new ChangeDiameterEdit(selected, oldDiameter, selected.getDiameter())));
    }

    public void undo() {
        undoManager.undo();
        draw();
    }

    public void redo() {
        undoManager.redo();
        draw();
    }

    private class CreateCircleEdit extends UndoableEdit {

        private Circle circle;

        CreateCircleEdit(Circle circle) {
            this.circle = circle;
        }

        public void undo() {
            circles.remove(circle);
        }

        public void redo() {
            circles.add(circle);
        }

    }

    private class ChangeDiameterEdit extends UndoableEdit {

        private Circle circle;
        private int oldDiameter, newDiameter;

        ChangeDiameterEdit(Circle circle, int oldDiameter, int newDiameter) {
            this.circle = circle;
            this.oldDiameter = oldDiameter;
            this.newDiameter = newDiameter;
        }

        public void undo() {
            circle.setDiameter(oldDiameter);
        }

        public void redo() {
            circle.setDiameter(newDiameter);
        }

    }

}