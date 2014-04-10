package sevenguis.counter;

import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextField;

public class Counter extends JFrame {
    JTextField counterField;
    JButton countButton;
    
    public Counter(String name) {
        super(name);

        counterField = new JTextField("0", 5);
        counterField.setEditable(false);
        countButton = new JButton("Count");

        Container pane = this.getContentPane();
        pane.setLayout(new FlowLayout());
        pane.add(counterField);
        pane.add(countButton);

        countButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                counterField.setText(String.valueOf(
                        Integer.parseInt(counterField.getText()) + 1));
            }
        });
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                Counter frame = new Counter("Counter");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}