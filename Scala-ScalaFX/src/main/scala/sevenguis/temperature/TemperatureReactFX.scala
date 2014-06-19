package sevenguis.temperature

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Label, TextField}
import scalafx.scene.layout.HBox
import scalafx.geometry.Insets

import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

// https://gist.github.com/TomasMikula/e84c2b003cb5a6e6454f
object TemperatureReactFX extends JFXApp {
  val celsius = new TextField
  val fahrenheit = new TextField

  celsius.text |= fahrenheit.text.filter((v => isNumeric(v)): (String => Boolean)).map((v => fToC(v)): (String => String))
  fahrenheit.text |= celsius.text.filter((v => isNumeric(v)): (String => Boolean)).map((v => cToF(v)): (String => String))

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

