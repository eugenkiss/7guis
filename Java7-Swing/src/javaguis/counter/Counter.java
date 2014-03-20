package javaguis.counter;

import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextField;

public class Counter extends JFrame {
    JTextField counterField;
    JButton countUpButton;
    JButton countDownButton;
    JButton resetButton;
    
    public Counter(String name) {
        super(name);
        initGUI();
        initListeners();
    }
    
    private void initGUI() {
        counterField = new JTextField("0", 5);
        counterField.setEditable(false);
        countUpButton = new JButton("Count Up");
        countDownButton = new JButton("Count Down");
        resetButton = new JButton("Reset");

        Container pane = this.getContentPane();
        pane.setLayout(new FlowLayout());
        pane.add(counterField);
        pane.add(countUpButton);
        pane.add(countDownButton);
        pane.add(resetButton);
    }
    
    private void initListeners() {
        countUpButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                counterField.setText(String.valueOf(
                        Integer.parseInt(counterField.getText()) + 1));
            }
        });
        countDownButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                counterField.setText(String.valueOf(
                        Integer.parseInt(counterField.getText()) - 1));
            }
        });
        resetButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                counterField.setText("0");
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