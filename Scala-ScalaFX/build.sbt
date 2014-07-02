name := "Scala-ScalaFX"

version := "1.0"

//scalaVersion := "2.10.3"

scalaVersion := "2.11.0"

// http://stackoverflow.com/questions/19208942/enforcing-java-version-for-scala-project-in-sbt
//initialize := {
//   val _ = initialize.value // run the previous initialization
//   val specVersion = sys.props("java.specification.version").toDouble
//   assert(specVersion >= 1.8, "Java 8 or above required")
//}

resolvers += "Sonatype OSS Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots"

libraryDependencies += "org.scala-lang.modules" %% "scala-parser-combinators" % "1.0.1"

libraryDependencies += "org.fxmisc.easybind" % "easybind" % "1.0.1"

libraryDependencies += "org.reactfx" % "reactfx" % "1.2.0"

libraryDependencies += "org.scalafx" %% "scalafx" % "8.0.0-R4"

libraryDependencies += "com.scalarx" % "scalarx_2.10" % "0.2.3"

resolvers += "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/"

libraryDependencies += "com.typesafe.akka" %% "akka-actor" % "2.3.2"

//unmanagedJars in Compile += Attributed.blank(file(System.getenv("JAVA_HOME") + "/jre/lib/jfxrt.jar"))

fork := true