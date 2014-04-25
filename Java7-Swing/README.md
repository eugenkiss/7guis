7GUIs in Java7-Swing
====================

This is an implementation of 7GUIs in Java version 7 with Swing as the toolkit
in the format of an Eclipse project. There is one package for each task with
one or more Java files. Each package has a class with a main method so you can
see the resulting GUI application by running the corresponding file.
The solutions follow the object-oriented paradigm.

Compared to JavaFX 8 — Swing's spiritual succesor — this solution needs *a
lot* of boilerplate. The role of the toolkit in terms of programming usability
for the creation of GUI applications is therefore obviously very important.


Information About Swing
-----------------------

[Swing](http://docs.oracle.com/javase/tutorial/uiswing/index.html) was the
main and default Java GUI toolkit until Java version 8 where it was
essentially superseded by JavaFX. A Swing GUI is composed of *containers* and
*components* (widgets). There is one or several *top-level containers* (e.g.
the main window frame) which hold other containers. These containers in turn
hold still other containers or components whose layout is determined by the
respective layout manager attached to the holding container. Swing's
concurrency model is event-based with a special *event dispatch
thread\** where event-handling code is executed and *worker threads*
for long running tasks. A user must be aware of this concurrency model so as
to not freeze the GUI with longer running computations or create thread-
related bugs by accident.

<sup>\*Interestingly, in the beginning it was tried to make Swing a multi-threaded
toolkit without the need for an event dispatch thread. This attempt proved to be
futile due to implementation complexities. For more information see
[this article](https://weblogs.java.net/blog/kgh/archive/2004/10/multithreaded_t.html).</sup>

In order to separate domain-specific from GUI-specific concerns, Swing uses a
practical variation of the MVC pattern by the name of [*separable model architecture*][mvc].
In contrast to the original MVC pattern there is no distinction between the
view and the controller but only a separation between a model and its view(s).
This separation is used throughout the Swing toolkit as each widget has a
corresponding model interface, e.g. `JButton` and `ButtonModel`. MVC or
“quasi-MVC” is a pattern that makes use of other patterns like the Observer,
Composite and Strategy design patterns. Therefore, Swing, too, uses these
patterns to implement its MVC variation and a user must be aware of them.

  [mvc]: http://www.eecs.yorku.ca/course_archive/2004-05/W/3461/FowlerArticle.pdf

The following is a hello world program that creates a window containing a
label with the text “Hello World”.

```java
import javax.swing.*;

public class HelloWorldSwing {

    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                JFrame frame = new JFrame("Hello World");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JLabel label = new JLabel("Hello World");
                frame.getContentPane().add(label);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}
```