7GUIs in Clojure-Seesaw
=======================

This is an implementation of 7GUIs in Clojure version 1.5 with Seesaw in
version 1.4 as the toolkit in the format of a Leiningen project. There is one
namespace for each task each with one Clojure file that has a main function.
The solutions as much as possible follow the functional paradigm. Note that
due to Clojure's Java interoperability the Java7-Swing examples could be
imitated almost literally but then different paradigms would not be compared
anymore.

Compared to Swing — Seesaw builds on top of Swing — this solution is much
more succinct due to bindings, tree-like layout definitions, succinct
anonymous function syntax and in general better API design. But compared to
JavaFX 8 the distinction is not so great anymore as JavaFX also introduced
bindings, Java 8 has a succinct anonymous function syntax and JavaFX has a
much better API design than Swing. The main distinction is basically the
language as Clojure is obviously a wholly different language from Java. Still,
it is again apparent that the toolkit plays an important role when it comes to
pure GUI programming as JavaFX essentially closes the gap to Seesaw without a
significant language change except for lambdas. There are still differences
though for some of the tasks due to the different paradigms, that is object-
oriented and functional.


Information About Seesaw
------------------------

[Seesaw](https://github.com/daveray/seesaw/) is an idiomatic Clojure GUI
toolkit whose goals are to provide unified abstractions and to address Swing's
shortcomings by exporting a better interface on top of Swing.

Almost all of the functions that operate on widgets return the widget itself.
This way function calls on widgets can be easily chained. One advantage of
this approach is that the code that creates the GUI can be written in a
tree-like manner such that its structure matches the resulting GUI's
hierarchical structure.

Most widgets have a natural value associated. For instance, a label's natural
value is its text string. In general, widgets in Seesaw can be thought of as a
kind of function whose input are the user-interactions and whose output is the
result of the user-interaction. In this way Seesaw tries to translate the
functional paradigm into the world of GUI widgets.

Selectors allow the separation of layout and behavior much like it is the case
for HTML and CSS. Not only that but they also allow the execution of bulk
operations on several widgets at once. In general, some of the design
decisions seem to be inspired by jQuery.

Associating listeners with events is easier than it is in Java7-Swing for one
due to anonymous function and also because of the lack of listener interfaces.
Bindings are a more declarative alternative for the association of listeners
to events. As the name implies values of several different widgets can be
coupled such that a change of the value in one widget is automatically
reflected in the other and if need be vice versa. Bindings go somewhat in the
direction of functional reactive programming.

As for the miscellaneous, Seesaw provides some additional niceties like
shortcuts for Colors, Fonts, Icons, Dimensions etc., but also integration with
popular Swing extension libraries like MigLayout. Also, there is no particular
insistence to let the model-view-separation nature of Swing shine through in
Seesaw.

The following is a hello world program that creates a window containing a
label with the text “Hello World”.

```clojure
(use 'seesaw.core)

(defn -main [& args]
  (invoke-later
    (-> (frame :title "Hello",
           :content "Hello, Seesaw",
           :on-close :exit)
     pack!
     show!)))
```