package sevenguis.cells;

import javafx.beans.binding.Binding;
import javafx.beans.binding.Bindings;
import javafx.beans.binding.DoubleBinding;
import javafx.beans.binding.ObjectBinding;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.beans.value.ObservableDoubleValue;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableArray;
import javafx.collections.ObservableList;
import org.fxmisc.easybind.EasyBind;
import org.fxmisc.easybind.monadic.MonadicBinding;

import java.util.List;
import java.util.Observable;
import java.util.Observer;

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

        public final StringProperty userData = new SimpleStringProperty("");
        public final StringProperty text = new SimpleStringProperty("");
        ObservableValue<Double>[] toArray(List<ObservableValue<Double>> l) {
              return l.toArray(new ObservableValue[l.size()]);
        }
        // Has same problem
//        public ObservableValue<Double> value = EasyBind.map(userData, Parser::parse)
//                .flatMap(f -> Bindings.createObjectBinding(() -> f.eval(Model.this), toArray(f.getReferences(Model.this))));
        // Has same problem
        public ObservableValue<Double> value =
                Bindings.createObjectBinding(() -> {
                    System.out.println(System.currentTimeMillis());
                    Formula f = Parser.parse(userData.get());
                    ObservableValue<Double>[] fs = toArray(f.getReferences(Model.this));
                    Binding<Double> d = Bindings.createObjectBinding(() -> {
                        double v = f.eval(Model.this);
//                        text.set(String.valueOf(v));
                        return v;
                    }, fs);
                    d.addListener((v, o, n) -> {
                        // ???
                    });
                    return d.getValue();
                }, userData);


        public void setShowUserData(Boolean b) {
            if (b)  text.setValue(userData.get());
            else text.setValue(String.valueOf(value.getValue()));
        }

    }
}
