name := "Scala-ScalaFX"

version := "1.0"

scalaVersion := "2.10.3"

libraryDependencies += "org.scalafx" %% "scalafx" % "8.0.0-R4"

libraryDependencies += "com.scalarx" % "scalarx_2.10" % "0.2.3"

//unmanagedJars in Compile += Attributed.blank(file(System.getenv("JAVA_HOME") + "/jre/lib/jfxrt.jar"))

//fork := true