package sevenguis.temperature

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Label, TextField}
import scalafx.scene.layout.HBox
import scalafx.geometry.Insets

import rx._
import rx.ops._
import javafx.beans.value.{ChangeListener, ObservableValue}

object TemperatureRx extends JFXApp {
  val celsius = new TextField
  val fahrenheit = new TextField

  // TODO How could one improve this code?
  // It seems to be impossible to use an Rx block for cyclic dependencies?
  // Could help maybe: forward declarations? lazy computation?
  // The code is similar to the binding solution of Clojure-Seesaw as each
  // direction is declared separately and both solutions need to guard against
  // feedback loops. ScalaRx has a more native declarative notation but at
  // the same time this indented mechanical boilerplate is needed.

  val celsius_text = Var("")
          val o0 = Obs(celsius_text) { celsius.text = celsius_text() }
          celsius.text.addListener(new ChangeListener[String] {
            override def changed(observable: ObservableValue[_ <: String], oldValue: String, newValue: String): Unit =
              celsius_text() = newValue
          })
  val fahrenheit_text = Var("")
          val o1 = Obs(fahrenheit_text) { fahrenheit.text = fahrenheit_text() }
          fahrenheit.text.addListener(new ChangeListener[String] {
            override def changed(observable: ObservableValue[_ <: String], oldValue: String, newValue: String): Unit =
              fahrenheit_text() = newValue
          })
  val o_c2f = celsius_text.foreach{ c => if (celsius.focused.value) {
    fahrenheit_text() = if (isNumeric(c)) cToF(c) else fahrenheit_text()
  }}
  val o_f2c = fahrenheit_text.foreach{ f => if (fahrenheit.focused.value) {
    celsius_text() = if (isNumeric(f)) fToC(f) else celsius_text()
  }}

  // In an ideal world this is all that would be needed for the dataflow declaration:
  //celsius.text = Rx{ if (isNumeric(fahrenheit.text)) fToC(fahrenheit.text) else celsius.text }
  //fahrenheit.text = Rx{ if (isNumeric(celsius.text)) cToF(celsius.text) else fahrenheit.text }
  // Or if it would make it easier to have cyclic dependencies without feedback loops:
  //Rxbi(celsius.text, fahrenheit.text,
  //  { (c, f) => if (isNumeric(c)) cToF(c) else f },
  //  { (f, c) => if (isNumeric(f)) fToC(f) else c })

  stage = new PrimaryStage {
    title = "Temperature Converter"
    scene = new Scene {
      content = new HBox(10) {
        padding = Insets(10)
        content = Seq(celsius, Label("Celsius ="), fahrenheit, Label("Fahrenheit"))
      }
    }
  }

  def cToF(c: Double): Double = (9/5d * c) + 32
  def fToC(f: Double): Double = 5/9d * (f - 32)
  def cToF(c: String): String = cToF(c.toDouble).round.toString
  def fToC(f: String): String = fToC(f.toDouble).round.toString
  def isNumeric(s: String): Boolean = {
    try { s.toDouble }
    catch { case _: Throwable => return false }
    true
  }
}

