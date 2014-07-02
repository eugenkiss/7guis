package sevenguis.cells2

import java.util.concurrent.Callable
import javafx.beans.binding.{ObjectBinding, Bindings}
import javafx.beans.property.{SimpleStringProperty, SimpleBooleanProperty}

import org.fxmisc.easybind.EasyBind

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import javafx.scene.Scene
import javafx.scene.layout.HBox

import javafx.collections.{FXCollections, ListChangeListener, ObservableList}
import javafx.scene.control.cell.TextFieldTableCell
import javafx.util.Callback
import javafx.beans.value.{ObservableObjectValue, ObservableValue}
import javafx.scene.control.{ScrollBar, ScrollPane, ListView, TableColumn, TableView}
import javafx.event.EventHandler
import javafx.scene.Node

import javafx.scene.control.TableColumn.{CellEditEvent, CellDataFeatures}
import scalafx.beans.property.StringProperty
import scalafx.Includes._
import java.util.{Observable, Observer}

import sevenguis.Scala2Java8._
import scala.collection.JavaConverters._

// The same caveat applies as for the Java8/JavaFX solution:
// You must never cancel an edit, i.e. always commit with enter. I tried and
// tried to make it work but its seems to me that there is a bug in JavaFX somewhere.
object Cells extends JFXApp {
  stage = new PrimaryStage {
    title = "Cells"
    width = 400
    height = 400
    scene = new Scene(new Spreadsheet(100, 26))
  }
}

class Spreadsheet(height: Int, width: Int) extends HBox() {
  val cellModel: Model = new Model(height, width)
  import cellModel._

  val table = new TableView[ObservableList[Cell]]()
  table.editable = true
  table.setItems(cellsAsObservableList)

  // The following is very very JavaFX specific.

  var w: Int = 'A'
  while (w < 'A'+width) {
    val column = new TableColumn[ObservableList[Cell],String](w.toChar+"")
    column.setSortable(false)
    column.setMinWidth(50)
    column.setCellFactory(TextFieldTableCell.forTableColumn())
    val w0 = w
    column.setCellValueFactory(new Callback[TableColumn.CellDataFeatures[ObservableList[Cell], String], ObservableValue[String]] {
      override def call(param: CellDataFeatures[ObservableList[Cell], String]): ObservableValue[String] =
        param.getValue.get(w0 - 'A').text
    })
    column.setOnEditStart(new EventHandler[TableColumn.CellEditEvent[ObservableList[Cell], String]]{
      override def handle(event: CellEditEvent[ObservableList[Cell], String]): Unit = {
        val row = event.getTablePosition.getRow
        val col = event.getTablePosition.getColumn
        cells(row)(col).showUserData.set(true)
      }
    })
    column.setOnEditCommit(new EventHandler[TableColumn.CellEditEvent[ObservableList[Cell], String]]{
      override def handle(event: CellEditEvent[ObservableList[Cell], String]): Unit = {
        val row = event.getTablePosition.getRow
        val col = event.getTablePosition.getColumn
        cells(row)(col).userData.set(event.getNewValue)
        cells(row)(col).showUserData.set(false)
      }
    })
    table.getColumns.add(column)
    w += 1
  }

  val rowHeaders = new ListView[String]()
  rowHeaders.getItems.add("")
  for (i <- 0 until height) rowHeaders.getItems.add(i+"")
  val scrolledRowHeaders = new ScrollPane(rowHeaders)
  scrolledRowHeaders.setHbarPolicy(ScrollPane.ScrollBarPolicy.NEVER)
  scrolledRowHeaders.setVbarPolicy(ScrollPane.ScrollBarPolicy.NEVER)

  table.getChildrenUnmodifiable.addListener(new ListChangeListener[Node] {
    def onChanged(c: ListChangeListener.Change[_ <: Node]) {
      val vbarTable = table.lookup(".scroll-bar:vertical").asInstanceOf[ScrollBar]
      val vbarRowHeaders = scrolledRowHeaders.lookup(".scroll-bar:vertical").asInstanceOf[ScrollBar]
      if (vbarRowHeaders != null && vbarTable != null)
        vbarTable.value <==> vbarRowHeaders.value
    }
  })

  getChildren.addAll(scrolledRowHeaders, table)
}


class Model(val height: Int, val width: Int) extends Evaluator with Arithmetic {

  case class Cell(row: Int, column: Int) {
    val outer: Evaluator = Model.this
    val showUserData = new SimpleBooleanProperty(false)
    val userData = new SimpleStringProperty("")
    val value: ObservableValue[Double] = EasyBind
      .map(userData, (v => FormulaParsers.parse(v)): (String => Formula))
      .flatMap((f => Bindings.createObjectBinding((() => outer.evaluate(f)): (() => Double), outer.references(f).map(_.value):_*)): (Formula => ObjectBinding[Double]))
    val text: ObjectBinding[String] = Bindings.when(showUserData)
      .then(userData.asInstanceOf[ObservableObjectValue[String]])
      .otherwise(Bindings.createObjectBinding[String](() => String.valueOf(value.getValue)))
  }

  val cells = Array.ofDim[Cell](height, width)
  for (i <- 0 until height; j <- 0 until width) cells(i)(j) = new Cell(i,j)

  def cellsAsObservableList: ObservableList[ObservableList[Cell]] = {
    val cs = FXCollections.observableArrayList[ObservableList[Cell]]()
    for (i <- 0 until height) {
      cs.add(FXCollections.observableArrayList())
      for (j <- 0 until width) cs.get(i).add(cells(i)(j))
    }
    cs
  }
}

