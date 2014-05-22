package sevenguis.flightbooker

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Button, ComboBox, TextField}
import scalafx.scene.layout.VBox
import scalafx.geometry.Insets
import java.time.format.DateTimeFormatter
import java.time.LocalDate
import javafx.beans.value.{ChangeListener, ObservableValue}

import rx._

object Ext {
  val observers: scala.collection.mutable.Buffer[Obs] = scala.collection.mutable.Buffer()

  implicit class PropertyExtensions[T,J](p: scalafx.beans.property.Property[T,J]) {
    def |=(x: => T) {
      val rx = Rx{x}
      observers += Obs(rx) { p() = rx() }
    }
    def rx(): Rx[T] = {
      val v = Var(p.value)
      p.addListener(new ChangeListener[J] {
        override def changed(observable: ObservableValue[_ <: J], oldValue: J, newValue: J): Unit = {
          v.update(p.value)
        }
      })
      v
    }
  }
}

object FlightBookerRx2 extends JFXApp {
  import Ext._

  val flightType = new ComboBox[String](Seq("one-way flight", "return flight"))
  flightType.value = "one-way flight"
  val startDate = new TextField {text=dateToString(LocalDate.now)}
  val returnDate = new TextField {text=dateToString(LocalDate.now)}
  val book = new Button("Book")

  // TODO: Way to eliminate the need for { } altogether?
  // TODO: .rx()() ~> ()
  returnDate.disable |= flightType.value.rx()() == "one-way flight"
  startDate.style  |= { if (isDateString(startDate.text.rx()()))  "" else "-fx-background-color: lightcoral" }
  returnDate.style |= { if (isDateString(returnDate.text.rx()())) "" else "-fx-background-color: lightcoral" }
  book.disable |= {
    flightType.value.rx()() match {
      case "one-way flight" => !isDateString(startDate.text.rx()())
      case "return flight" =>
        !isDateString(startDate.text.rx()()) || !isDateString(returnDate.text.rx()()) ||
        stringToDate(startDate.text.rx()()).compareTo(stringToDate(returnDate.text.rx()())) > 0
    }
  }

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
