package sevenguis.circledrawer;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class CircleDrawer extends JFrame {
    public CircleDrawer(String name) {
        super(name);

        JButton undoButton = new JButton("Undo");
        JButton redoButton = new JButton("Redo");
        final CircleDrawerCanvas canvas = new CircleDrawerCanvas();

        JPanel pane = new JPanel(new BorderLayout());
        pane.setPreferredSize(new Dimension(400, 400));
        pane.setBorder(BorderFactory.createEmptyBorder(0, 10, 10, 10));
        JPanel p = new JPanel();
        p.add(undoButton);
        p.add(redoButton);
        pane.add(p, BorderLayout.NORTH);
        pane.add(canvas, BorderLayout.CENTER);
        this.add(pane);
        
        undoButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                canvas.undo();
            }
        });
        redoButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                canvas.redo();
            }
        });
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                CircleDrawer frame = new CircleDrawer("Circle Drawer");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}