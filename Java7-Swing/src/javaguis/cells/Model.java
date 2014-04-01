package javaguis.cells;

import javax.swing.table.AbstractTableModel;

class Model extends AbstractTableModel {
    private int height;
    private int width;
    private Cell[][] cells;

    Model(int height, int width) {
        this.height = height;
        this.width = width;
        cells = new Cell[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                cells[i][j] = new Cell(i, j, this);
            }
        }
    }
    
    public Cell[][] getCells() {
        return cells;
    }

    public int getRowCount() {
        return height;
    }

    public int getColumnCount() {
        return width;
    }

    public boolean isCellEditable(int row, int col) { 
        return true; 
    }

    public Object getValueAt(int row, int column) { 
        Cell cell = cells[row][column];
        if (cell.getFormula() instanceof Textual) {
            return ((Textual)cell.getFormula()).value;
        }
        return cells[row][column].getValue(); 
    }

    public void setValueAt(Object value, int row, int column) {
        Cell cell = cells[row][column];
        try {
            cell.setFormula(Parser.parse((String)value));
        } catch (Exception e) {
            cell.setFormula(new Textual(e.getMessage()));
        }
        fireTableCellUpdated(row, column);
    }
}