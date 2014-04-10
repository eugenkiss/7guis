package sevenguis.cells;

import javax.swing.table.DefaultTableModel;

class Model extends DefaultTableModel {
    private Cell[][] cells;

    Model(int height, int width) {
        super(height, width);
        cells = new Cell[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                cells[i][j] = new Cell(this);
            }
        }
    }
    
    public Cell[][] getCells() {
        return cells;
    }
}