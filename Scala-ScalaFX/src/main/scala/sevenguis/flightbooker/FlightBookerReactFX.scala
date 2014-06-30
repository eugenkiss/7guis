package sevenguis.flightbooker

import java.util.function.Consumer

import org.reactfx.EventStream

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Button, ComboBox, TextField}
import scalafx.scene.layout.VBox
import scalafx.geometry.Insets
import java.time.format.DateTimeFormatter
import java.time.LocalDate
import java.lang.Boolean

import org.reactfx.EventStreams._
import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

object FlightBookerReactFX extends JFXApp {
  val flightType = new ComboBox[String](Seq("one-way flight", "return flight"))
  flightType.value() = "one-way flight"
  val startDate = new TextField{text=dateToString(LocalDate.now)}
  val returnDate = new TextField{text=dateToString(LocalDate.now)}
  val book = new Button("Book")

  returnDate.disable |= flightType.value ==== "one-way flight"
  startDate.style |= startDate.text.map((t => if (isDateString(t)) "" else "-fx-background-color: lightcoral") : (String => String))
  returnDate.style |= returnDate.text.map((t => if (isDateString(t)) "" else "-fx-background-color: lightcoral") : (String => String))
  book.disable |= combine(flightType.value, startDate.text, returnDate.text)
    .map({case (ft, sd, rd) => ft match {
      case "one-way flight" => !isDateString(sd)
      case "return flight" => !isDateString(sd) || !isDateString(rd) || stringToDate(sd).compareTo(stringToDate(rd)) > 0
  }} : ((String, String, String) => Boolean))

  stage = new PrimaryStage {
    title = "FlightBooker"
    scene = new Scene {
      content = new VBox(10) {
        padding = Insets(10)
        content = Seq(flightType, startDate, returnDate, book)
      }
    }
  }

  def dateToString(date: LocalDate) = date.format(DateTimeFormatter.ISO_LOCAL_DATE)
  def stringToDate(string: String) = LocalDate.from(DateTimeFormatter.ISO_LOCAL_DATE.parse(string))
  def isDateString(string: String) =
    try {
      DateTimeFormatter.ISO_LOCAL_DATE.parse(string)
      true
    } catch {
      case e: Exception => false
    }
}
