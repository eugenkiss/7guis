package sevenguis.flightbooker

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

// https://gist.github.com/TomasMikula/613af9b7ca6b147e9b0b
object FlightBookerReactFX extends JFXApp {
  val flightType = new ComboBox[String](Seq("one-way flight", "return flight"))
  // If I don't set flightType's value to return flight here,
  // the later setting to one-way flight is not picked up apparently...
  flightType.value = "return flight"
  val startDate = new TextField()
  val returnDate = new TextField()
  val book = new Button("Book")

  // The expressions need to be massaged with generous type annotations to make the Scala compiler happy.
  val oneWay: EventStream[Boolean] = flightType.value.map((v => v == "one-way flight"): (String => Boolean))
  val startDateDate: EventStream[LocalDate] = startDate.text
          .map((txt => if (isDateString(txt)) stringToDate(txt) else null): (String => LocalDate))
  val returnDateDate: EventStream[LocalDate] = returnDate.text
          .map((txt => if (isDateString(txt)) stringToDate(txt) else null): (String => LocalDate))
  val startDateValid: EventStream[Boolean] = startDateDate.map((v => v != null): (LocalDate => Boolean))
  val returnDateValid: EventStream[Boolean] = returnDateDate.map((v => v != null): (LocalDate => Boolean))
  val dateRangeValid: EventStream[Boolean] = combine(startDateDate, returnDateDate)
          .map(((s, r) => s != null && r != null && s.compareTo(r) <= 0 ): ((LocalDate, LocalDate) => Boolean))
  val datesValid: EventStream[Boolean] = combine(oneWay, startDateValid, dateRangeValid)
          .map(((o, s, r) => o && s || r): ((Boolean, Boolean, Boolean) => Boolean))

  returnDate.disable |= oneWay
  startDate.style |= startDateValid.map((v => if (v) "" else "-fx-background-color: lightcoral"): (Boolean => String))
  returnDate.style |= returnDateValid.map((v => if (v) "" else "-fx-background-color: lightcoral"): (Boolean => String))
  book.disable |= datesValid.map((v => !v): (Boolean => Boolean))

  // It is very important to initialize the values of the widgets *after* the definition of the
  // functional dependencies due to combine's semantics!
  flightType.value() = "one-way flight"
  startDate.text() = dateToString(LocalDate.now)
  returnDate.text() = dateToString(LocalDate.now)

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
