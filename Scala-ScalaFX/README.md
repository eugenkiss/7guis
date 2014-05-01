7GUIs in Scala-ScalaFX
======================

This is an implementation of 7GUIs in Scala version 2.10 with ScalaFX in
version 8.0.0-R4 as the toolkit. There is one package for each task with one
or more Scala files. The solutions follow the functional paradigm as far as
reasonable.


Setup Instructions
------------------

The project requires JDK 8. You also need sbt or maven to build the project.
Please make sure that your sbt installation uses JDK 8. If you are not sure
the following link might help you: http://stackoverflow.com/a/7705091/283607

To run the code from the command line with sbt enter `sbt run`. You will be
prompted with a list of executable files. By entering a corresponding number
you can run a file.

You can import the project into Intellij IDEA or Netbeans as both these
IDEs natively support sbt Scala projects.

To import the project into Eclipse or Scala IDE execute `sbt eclipse`
(uncomment the corresponding line in `project/plugins.sbt`).
This command will create Eclipse project files. After that you should
be able to import the project into Eclipse.

There is also a `pom.xml` so that you should be able to work with maven.