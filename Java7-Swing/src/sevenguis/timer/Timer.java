package sevenguis.timer;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class Timer extends JFrame {
    int elapsed, duration;
    JProgressBar progressBar;
    JLabel elapsedLabel;
    JSlider durationSlider;
    JButton resetButton;
    
    public Timer(String name) {
        super(name);
        elapsed = 0;
        duration = 200;
        initGUI();
        initListeners();
    }
    
    private void initGUI() {
        progressBar = new JProgressBar(0, duration);
        elapsedLabel = new JLabel("0s");
        durationSlider = new JSlider(1, 400, duration);
        resetButton = new JButton("Reset");

        JPanel pane = new JPanel(new GridLayout(4, 0));
        pane.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        JPanel p = new JPanel();
        p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
        p.add(new JLabel("Elapsed Time: "));
        p.add(progressBar);
        pane.add(p);
        pane.add(elapsedLabel);
        p = new JPanel();
        p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
        p.add(new JLabel("Duration: "));
        p.add(durationSlider);
        pane.add(p);
        pane.add(resetButton);
        this.add(pane);
    }
    
    private void initListeners() {
        javax.swing.Timer timer = new javax.swing.Timer(100, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (elapsed < duration) {
				    elapsed++;
                }
				progressBar.setValue(elapsed);
				progressBar.setMaximum(duration);
				elapsedLabel.setText(formatElapsed(elapsed));
            }
        });
        timer.start();
        durationSlider.addChangeListener(new ChangeListener() {
            public void stateChanged(ChangeEvent e) {
			    duration = (int) Math.max(elapsed, durationSlider.getValue());
            }
        });
        resetButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                elapsed = 0;
                duration = (int) durationSlider.getValue();
            }
        });
    }
    
    private static String formatElapsed(int elapsed) {
        int seconds = (int) Math.floor(elapsed / 10.0);
        int dezipart = elapsed % 10;
        return seconds + "." + dezipart + "s";
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                Timer frame = new Timer("Timer");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}