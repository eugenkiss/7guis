package sevenguis.flightbooker

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Button, ComboBox, TextField}
import scalafx.scene.layout.VBox
import scalafx.geometry.Insets
import java.time.format.DateTimeFormatter
import java.time.LocalDate
import scalafx.Includes._
import javafx.beans.value.{ObservableValue}
import javafx.beans.binding.Bindings
import java.util.concurrent.Callable
import java.lang.Boolean

object FlightBooker extends JFXApp {
  val flightType = new ComboBox[String](Seq("one-way flight", "return flight"))
  flightType.value = "one-way flight"
  val startDate = new TextField{text=dateToString(LocalDate.now)}
  val returnDate = new TextField{text=dateToString(LocalDate.now)}
  val book = new Button("Book")

  returnDate.disable <== flightType.value === "one-way flight"
  // Ideally, I'd write it the following way
  //startDate.style <==
  //  when (isDateString(startDate.text)) choose "" otherwise "-fx-background-color: lightcoral"
  startDate.style <== Bindings.createStringBinding(new Callable[String] { override def call(): String =
    if (isDateString(startDate.text.value)) "" else "-fx-background-color: lightcoral"
  }, startDate.text)
  // For comparison, a callback based approach
  returnDate.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
    returnDate.style = if (isDateString(n)) "" else "-fx-background-color: lightcoral")
  book.disable <==  Bindings.createBooleanBinding(new Callable[Boolean] { override def call(): Boolean =
    flightType.value.value match {
      case "one-way flight" => !isDateString(startDate.text.value)
      case "return flight" =>
        !isDateString(startDate.text.value) || !isDateString(returnDate.text.value) ||
        stringToDate(startDate.text.value).compareTo(stringToDate(returnDate.text.value)) > 0
    }
  }, flightType.value, startDate.text, returnDate.text)

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
