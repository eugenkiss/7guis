package sevenguis.cells.rx

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import javafx.scene.Scene
import javafx.scene.layout.HBox

import javafx.collections.{FXCollections, ListChangeListener, ObservableList}
import javafx.scene.control.cell.TextFieldTableCell
import javafx.util.Callback
import javafx.beans.value.ObservableValue
import javafx.scene.control.{ScrollBar, ScrollPane, ListView, TableColumn, TableView}
import javafx.event.EventHandler
import javafx.scene.Node

import javafx.scene.control.TableColumn.{CellEditEvent, CellDataFeatures}
import scalafx.beans.property.StringProperty
import scalafx.Includes._
import java.util.{Observable, Observer}

// TODO
object CellsRx extends JFXApp {
  stage = new PrimaryStage {
    title = "Cells"
    width = 400
    height = 400
    scene = new Scene(new SpreadsheetRx(100, 26))
  }
}

class SpreadsheetRx(height: Int, width: Int) extends HBox() {
  val cellModel: ModelRx = new ModelRx(height, width)
  import cellModel._

  val table = new TableView[ObservableList[CellRx]]()
  table.editable = true
  table.setItems(cellsAsObservableList)

  // The following is very very JavaFX specific.

  var w: Int = 'A'
  while (w < 'A'+width) {
    val column = new TableColumn[ObservableList[CellRx],String](w.toChar+"")
    column.setSortable(false)
    column.setMinWidth(50)
    column.setCellFactory(TextFieldTableCell.forTableColumn())
    val w0 = w
    column.setCellValueFactory(new Callback[TableColumn.CellDataFeatures[ObservableList[CellRx], String], ObservableValue[String]] {
      override def call(param: CellDataFeatures[ObservableList[CellRx], String]): ObservableValue[String] =
        param.getValue.get(w0 - 'A').text
    })
    column.setOnEditStart(new EventHandler[TableColumn.CellEditEvent[ObservableList[CellRx], String]]{
      override def handle(event: CellEditEvent[ObservableList[CellRx], String]): Unit = {
        val row = event.getTablePosition.getRow
        val col = event.getTablePosition.getColumn
        cells(row)(col).showUserData()
      }
    })
    column.setOnEditCommit(new EventHandler[TableColumn.CellEditEvent[ObservableList[CellRx], String]]{
      override def handle(event: CellEditEvent[ObservableList[CellRx], String]): Unit = {
        val formula = FormulaParsers.parse(event.getNewValue)
        val row = event.getTablePosition.getRow
        val col = event.getTablePosition.getColumn
        cells(row)(col).formula = formula
        cells(row)(col).userData = event.getNewValue
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


class ModelRx(val height: Int, val width: Int) extends Evaluator with Arithmetic {

  case class CellRx(row: Int, column: Int) extends Observable with Observer {
    private var f: Formula = Empty
    def formula: Formula = f
    def formula_=(f: Formula) = {
      for (c <- references(formula)) c.deleteObserver(this)
      this.f = f
      for (c <- references(formula)) c.addObserver(this)
      value = evaluate(f)
      text.set(toString)
    }

    private var v: Double = 0
    def value: Double = v
    def value_=(w: Double) {
      if (!(v == w || v.isNaN && w.isNaN)) {
        v = w
        text.set(toString)
        setChanged()
        notifyObservers()
      }
    }

    override def update(o: Observable, arg: scala.Any) = {
      value = evaluate(formula)
    }

    val text = StringProperty("")
    var userData = ""
    def showUserData() = text.set(userData)

    override def toString = formula match {
      case Textual(s) => s
      case _ => value.toString
    }
  }

  val cells = Array.ofDim[CellRx](height, width)
  for (i <- 0 until height; j <- 0 until width) cells(i)(j) = new CellRx(i,j)

  def cellsAsObservableList: ObservableList[ObservableList[CellRx]] = {
    val cs = FXCollections.observableArrayList[ObservableList[CellRx]]()
    for (i <- 0 until height) {
      cs.add(FXCollections.observableArrayList())
      for (j <- 0 until width) cs.get(i).add(cells(i)(j))
    }
    cs
  }
}

