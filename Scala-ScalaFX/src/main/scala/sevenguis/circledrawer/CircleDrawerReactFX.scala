package sevenguis.circledrawer


import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Slider, Label, Button}
import scalafx.scene.layout.{VBox, BorderPane, HBox}
import scalafx.geometry.Insets
import scalafx.scene.canvas.Canvas
import scalafx.scene.paint.Color
import scalafx.event.ActionEvent
import scalafx.Includes._
import scala.math._
import scalafx.stage.{Popup, WindowEvent, Stage}
import javafx.beans.value.ObservableValue

import org.reactfx.EventStream
import org.reactfx.EventStreams._
import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

// https://gist.github.com/TomasMikula/b04dd89da1584597fa14
object CircleDrawerFX extends JFXApp {
  val undo = new Button("Undo")
  val redo = new Button("Redo")
  val canvas = new CircleDrawerCanvasFX()

  undo.onAction = (event: ActionEvent) => canvas.undo()
  redo.onAction = (event: ActionEvent) => canvas.redo()

  stage = new PrimaryStage {
    title = "Circle Drawer ReactFX"
    scene = new Scene {
      content = new BorderPane() {
        padding = Insets(10)
        top = new HBox(10) {
          padding = Insets(10)
          content = Seq(undo, redo)
        }
        center = canvas
      }
    }
  }
}

class CircleDrawerCanvasFX extends Canvas(400, 400) {
  var circles = Seq[CircleFX]()

  val diameter = new Button("Diameter...")
  val popup = new Popup()
  popup.content.add(diameter)

  val leftPressesToVoid: EventStream[javafx.scene.input.MouseEvent] = this.mousePresses
          .filter((e => e.isPrimaryButtonDown): (javafx.scene.input.MouseEvent => Boolean))
          .filter((e => getNearestCircleAt(e.getX, e.getY) == null): (javafx.scene.input.MouseEvent => Boolean))
  val addedCircles: EventStream[CircleFX] = leftPressesToVoid
          .map((e => new CircleFX(e.getX, e.getY)): (javafx.scene.input.MouseEvent => CircleFX))
          // appending hook lead to compile error so subscribe it is
          addedCircles.subscribe((c => addCircle(c)): (CircleFX => Unit))
  val hoveredCircles: EventStream[CircleFX] = this.mouseMoves
          .map((e => getNearestCircleAt(e.getX, e.getY)): (javafx.scene.input.MouseEvent => CircleFX))
  merge(addedCircles, hoveredCircles).subscribe((c => draw(c)): (CircleFX => Unit))

  this.mousePresses.subscribe((e => if (popup.isShowing) popup.hide()): (javafx.scene.input.MouseEvent => Unit))
  val rightPressesToCircle: EventStream[javafx.scene.input.MouseEvent] = this.mousePresses
          .filter((e => e.isPopupTrigger): (javafx.scene.input.MouseEvent => Boolean))
          .filter((e => getNearestCircleAt(e.getX, e.getY) != null): (javafx.scene.input.MouseEvent => Boolean))
  rightPressesToCircle.subscribe((e => popup.show(this, e.getScreenX, e.getScreenY)): (javafx.scene.input.MouseEvent => Unit))
  val selectedCircles: EventStream[CircleFX] = rightPressesToCircle
          .map((e => getNearestCircleAt(e.getX, e.getY)): (javafx.scene.input.MouseEvent => CircleFX))
  selectedCircles.emitOn(diameter.actions).subscribe((c => {popup.hide(); showDialog(c)}): (CircleFX => Unit))

  draw()

  def draw(hovered: CircleFX = null) = {
    val g = graphicsContext2D
    g.setFill(Color.WHITE)
    g.setStroke(Color.BLACK)
    g.fillRect(0, 0, width.value, height.value)
    g.strokeRect(0, 0, width.value, height.value)

    for (c <- circles) {
      val offset = c.d / 2
      if (c == hovered) {
        g.setFill(Color.LIGHTGRAY)
        g.fillOval(c.x-offset, c.y-offset, c.d, c.d)
      }
      g.strokeOval(c.x-offset, c.y-offset, c.d, c.d)
    }
  }

  def addCircle(circle: CircleFX) {
    circles = circles :+ circle
    addSnapshot()
  }

  def getNearestCircleAt(x: Double, y: Double) = {
    var circle: CircleFX = null
    var minDist = Double.MaxValue
    for (c <- circles) {
      val d = sqrt(pow(x-c.x, 2) + pow(y-c.y, 2))
      if (d <= c.d/2 && d < minDist) {
        circle = c
        minDist = d
      }
    }
    circle
  }

  def showDialog(selected: CircleFX) {
    val dialog = new Stage()
    val info = new Label(s"Adjust diameter of circle at (${selected.x}, ${selected.y})")
    val slider = new Slider(10, 50, selected.d)

    val index = circles.indexOf(selected)
    slider.value.addListener((v: ObservableValue[_ <: Number], o: Number, n: Number) => {
      circles = circles.updated(index, selected.copy(d=n.doubleValue))
      draw()
    })
    dialog.onCloseRequest = (e: WindowEvent) => addSnapshot()

    dialog.scene = new Scene() {
      content = new VBox(10) {
        padding = Insets(10)
        content = Seq(info, slider)
      }
    }
    dialog.show()
  }

  var history = Seq[Seq[CircleFX]](Seq())
  var historyCursor = 0

  def addSnapshot() = {
    history = history.take(historyCursor+1) :+ circles
    historyCursor += 1
  }

  def undo() = if (historyCursor > 0) {
    historyCursor -= 1
    circles = history(historyCursor)
    draw()
  }

  def redo() = if (historyCursor < history.size-1) {
    historyCursor += 1
    circles = history(historyCursor)
    draw()
  }

}

case class CircleFX(x: Double, y: Double, d: Double = 30)