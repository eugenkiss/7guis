package sevenguis.cells2;

import javafx.beans.binding.Bindings;
import javafx.beans.binding.ObjectBinding;
import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.beans.value.ObservableObjectValue;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import org.fxmisc.easybind.EasyBind;

import java.util.List;

class Model {

    private Cell[][] cells;

    Model(int height, int width) {
        cells = new Cell[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                cells[i][j] = new Cell();
            }
        }
    }

    public Cell[][] getCells() {
        return cells;
    }

    public ObservableList<ObservableList<Cell>> getCellsAsObservableList() {
        ObservableList<ObservableList<Cell>> cs = FXCollections.observableArrayList();
        for (int i = 0; i < cells.length; i++) {
            cs.add(FXCollections.observableArrayList());
            for (int j = 0; j < cells[i].length; j++) {
                cs.get(i).add(cells[i][j]);
            }
        }
        return cs;
    }

    class Cell {

        private final BooleanProperty showUserData = new SimpleBooleanProperty(false);
        public final StringProperty userData = new SimpleStringProperty("");
        public ObservableValue<Double> value = EasyBind.map(userData, Parser::parse)
                .flatMap(f -> Bindings.createObjectBinding(() -> f.eval(Model.this), toArray(f.getReferences(Model.this))));
        public final ObjectBinding<String> text = Bindings.when(showUserData)
                .then((ObservableObjectValue<String>) userData)
                .otherwise(EasyBind.map(value, String::valueOf));

        ObservableValue<Double>[] toArray(List<ObservableValue<Double>> l) {
              return l.toArray(new ObservableValue[l.size()]);
        }

        public void setShowUserData(Boolean b) {
            showUserData.set(b);
        }

    }
}
