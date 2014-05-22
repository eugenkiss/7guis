package sevenguis.temperature

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Label, TextField}
import scalafx.scene.layout.HBox
import scalafx.geometry.Insets

import sevenguis.RxIntegration._

object TemperatureRx extends JFXApp {
  val celsius = new TextField
  val fahrenheit = new TextField

  celsius.text |= { if (isNumeric(fahrenheit.text.rx()())) fToC(fahrenheit.text.rx()()) else celsius.text() }
  fahrenheit.text |= { if (isNumeric(celsius.text.rx()())) cToF(celsius.text.rx()()) else fahrenheit.text() }

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

