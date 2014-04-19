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
import javafx.beans.value.{ObservableValue, ChangeListener}

object FlightBooker extends JFXApp {
  val flightType = new ComboBox[String](Seq("one-way flight", "return flight"))
  val startDate = new TextField{text=dateToString(LocalDate.now)}
  val returnDate = new TextField{text=dateToString(LocalDate.now)}
  val book = new Button("Book")

  returnDate.disable <== flightType.value === "one-way flight"
  // Ideally, I'd write it the following way but that would mean a lot of boilerplate code
  // to make an observable value from 'isDateString(startDate.text))'.
  //startDate.style <==
  //  when (isDateString(startDate.text)) choose "" otherwise "-fx-background-color: lightcoral"
  startDate.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
    startDate.style = if (isDateString(n)) "" else "-fx-background-color: lightcoral")
  returnDate.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
    returnDate.style = if (isDateString(n)) "" else "-fx-background-color: lightcoral")
  // Ideally, I would describe a binding expression such that 'book.disableProperty'
  // would be on the left side and the switch condition on the right side and the system
  // would figure out when and how to update the enabled status of 'book' (see FlightBookerRx).
  // The current version blurs the data flow with imperative details.
  // Again, it would be possible to achieve this somewhat passably in pure JavaFX or ScalaFX
  // but it would mean to write a lot of new property classes which is probably so much
  // overhead that it wouldn't be done in practice.
  val bookEnabledAction: ChangeListener[String] = (v: ObservableValue[_ <: String], o: String, n: String) =>
      flightType.value.value match {
        case "one-way flight" => book.disable = !isDateString(startDate.text.value)
        case "return flight" => book.disable =
          !isDateString(startDate.text.value) ||
            !isDateString(returnDate.text.value) ||
            stringToDate(startDate.text.value).compareTo(stringToDate(returnDate.text.value)) > 0
      }
  flightType.value.addListener(bookEnabledAction)
  startDate.text.addListener(bookEnabledAction)
  returnDate.text.addListener(bookEnabledAction)
  flightType.value = "one-way flight"

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
