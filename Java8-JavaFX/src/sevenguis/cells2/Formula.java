package sevenguis.cells2;

import javafx.beans.value.ObservableValue;
import javafx.scene.control.Cell;

import java.util.*;

abstract class Formula {
    public static final Formula Empty = new Textual("");
    public double eval(Model env) { return 0.0; }
    public List<ObservableValue<Double>> getReferences(Model env) { return Collections.emptyList(); }
}

class Textual extends Formula {
    String value;

    public Textual(String value) {
        this.value = value;
    }

    public String toString() {
        return value;
    }
}

class Number extends Formula {
    double value;

    public Number(double value) {
        this.value = value;
    }

    public String toString() {
        return String.valueOf(value);
    }

    public double eval(Model env) {
        return value;
    }
}

class Coord extends Formula {
    int row, column;

    public Coord(int row, int column) {
        this.row = row;
        this.column = column;
    }

    public String toString() {
        return ((char)('A'+column))+""+row;
    }

    public double eval(Model env) {
        return env.getCells()[row][column].value.getValue();
    }

    public List<ObservableValue<Double>> getReferences(Model env) {
        List<ObservableValue<Double>> result = new ArrayList<>(1);
        result.add(env.getCells()[row][column].value);
        return result;
    }
}

class Range extends Formula {
    Coord coord1, coord2;

    public Range(Coord coord1, Coord coord2) {
        this.coord1 = coord1; this.coord2 = coord2;
    }

    public String toString() {
        return String.valueOf(coord1)+":"+String.valueOf(coord2);
    }

    public double eval(Model env) {
        throw new RuntimeException("Range cannot be evaluated!");
    }

    public List<ObservableValue<Double>> getReferences(Model env) {
        List<ObservableValue<Double>> result = new ArrayList<>();
        for (int r = coord1.row; r <= coord2.row; r++) {
            for (int c = coord1.column; c <= coord2.column; c++) {
                result.add(env.getCells()[r][c].value);
            }
        }
        return result;
    }
}

class Application extends Formula {
    String function;
    List<Formula> arguments;

    public Application(String function, List<Formula> arguments) {
        this.function = function;
        this.arguments = arguments;
    }

    public String toString() {
        StringBuilder t = new StringBuilder();
        t.append(function);
        t.append("(");
        for (int i = 0; i < arguments.size()-1; i ++) {
            t.append(arguments.get(i).toString());
            t.append(", ");
        }
        if (!arguments.isEmpty()) t.append(arguments.get(arguments.size()-1).toString());
        t.append(")");
        return t.toString();
    }

    public double eval(Model env) {
        try {
            List<Double> argvals = evalList(arguments, env);
            return opTable.get(function).eval(argvals);
        } catch(Exception e) {
            return Double.NaN;
        }
    }

    public List<ObservableValue<Double>> getReferences(Model env) {
        List<ObservableValue<Double>> result = new ArrayList<>();
        for (Formula argument : arguments) {
            result.addAll(argument.getReferences(env));
        }
        return result;
    }


    private static List<Double> evalList(List<Formula> args, Model env) {
        List<Double> result = new ArrayList<>();
        for (Formula f : args) {
            if (f instanceof Range) {
                for (ObservableValue<Double> c : f.getReferences(env)) {
                    result.add(c.getValue());
                }
            } else {
                result.add(f.eval(env));
            }
        }
        return result;
    }

    private static Map<String, Op> opTable = new HashMap<>();
    static {
        opTable.put("add", vals -> vals.get(0) + vals.get(1));
        opTable.put("sub", vals -> vals.get(0) - vals.get(1));
        opTable.put("div", vals -> vals.get(0) / vals.get(1));
        opTable.put("mul", vals -> vals.get(0) * vals.get(1));
        opTable.put("mod", vals -> vals.get(0) % vals.get(1));
        opTable.put("sum", vals -> {
            double accum = 0;
            for (Double i : vals) {
                accum += i;
            }
            return accum;
        });
        opTable.put("prod", vals -> {
            double accum = 1;
            for (Double i : vals) {
                accum *= i;
            }
            return accum;
        });
    }

    private static interface Op {
        public double eval(List<Double> vals);
    }

}
