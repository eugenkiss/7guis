package sevenguis.circledrawer;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JSlider;
import javax.swing.SwingUtilities;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.undo.AbstractUndoableEdit;
import javax.swing.undo.UndoManager;

class CircleDrawerCanvas extends JPanel {
    private List<Circle> circles;
    private Circle hoveredCircle;
    private JPopupMenu popupMenu;
    private JMenuItem diameterItem;
    private UndoManager undoManager;

    public CircleDrawerCanvas() {
        hoveredCircle = null;
        undoManager = new UndoManager();
        circles = new ArrayList<Circle>();
        setBorder(BorderFactory.createLineBorder(Color.black));
        setBackground(Color.white);
        addMouseListener(mouseAdapter);
        addMouseMotionListener(mouseAdapter);
        popupMenu = new JPopupMenu("Properties");
        diameterItem = new JMenuItem("Diameter..");
        popupMenu.add(diameterItem);
        diameterItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                int oldDiameter = hoveredCircle.getDiameter();
                new DiameterDialog(hoveredCircle);
                undoManager.addEdit(new ChangeDiameterEdit(
                        hoveredCircle, oldDiameter, hoveredCircle.getDiameter()));
            }
        });
    }
    
    public void paintComponent(Graphics g0) {
        super.paintComponent(g0);       
        Graphics2D g = (Graphics2D) g0;
        RenderingHints rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHints(rh);

        for (Circle c : circles) {
            int offset = c.getDiameter() / 2;
            if (c.equals(hoveredCircle)) {
                g.setColor(Color.lightGray);
                g.fillOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
                g.setColor(Color.black);
            }
            g.drawOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
        }
    }
    
    public void addCircle(Circle circle) {
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

    public void undo() {
        if (undoManager.canUndo()) {
            undoManager.undo();
            repaint();
        }
    }
    
    public void redo() {
        if (undoManager.canRedo()) {
            undoManager.redo();
            repaint();
        }
    }

    
    private MouseAdapter mouseAdapter = new MouseAdapter() {
        public void mousePressed(MouseEvent e) {
            if (e.isPopupTrigger() && hoveredCircle != null) doPopup(e);
            if (SwingUtilities.isLeftMouseButton(e) && hoveredCircle == null) {
                Circle circle = new Circle(e.getX(), e.getY());
                addCircle(circle);
                mouseMoved(e);
            }
        }

        public void mouseReleased(MouseEvent e) { 
            if (e.isPopupTrigger()) doPopup(e);
        }

        public void mouseMoved(MouseEvent e) {
            hoveredCircle = getNearestCircleAt(e.getX(), e.getY());
            repaint();
        }  
        
        private void doPopup(MouseEvent e){
            popupMenu.show(e.getComponent(), e.getX(), e.getY());
        }
    };

    private class CreateCircleEdit extends AbstractUndoableEdit {
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
        
        public boolean canUndo() { return true; }
        public boolean canRedo() { return true; }
    }

    private class ChangeDiameterEdit extends AbstractUndoableEdit {
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
        
        public boolean canUndo() { return true; }
        public boolean canRedo() { return true; }
    }

    private class DiameterDialog {
        DiameterDialog(final Circle selected) {
            String message = "Adjust diameter of circle at (" 
                    + selected.getX() + ", " + selected.getY() + ").";
            final JSlider slider = new JSlider(10, 50, selected.getDiameter());
            slider.addChangeListener(new ChangeListener() {
                public void stateChanged(ChangeEvent e) {
                    selected.setDiameter(slider.getValue());
                    CircleDrawerCanvas.this.repaint();
                }
            });
            final JComponent[] inputs = new JComponent[] {new JLabel(message), slider};
            JOptionPane.showMessageDialog(CircleDrawerCanvas.this, inputs, "Adjusting diameter", JOptionPane.PLAIN_MESSAGE);
        }
    }
}

    