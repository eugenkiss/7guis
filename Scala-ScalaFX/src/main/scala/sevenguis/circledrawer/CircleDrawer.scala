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
import scalafx.scene.input.MouseEvent
import scalafx.stage.{Popup, WindowEvent, Stage}
import javafx.beans.value.ObservableValue

object CircleDrawer extends JFXApp {
  val undo = new Button("Undo")
  val redo = new Button("Redo")
  val canvas = new CircleDrawerCanvas()

  undo.onAction = (event: ActionEvent) => canvas.undo()
  redo.onAction = (event: ActionEvent) => canvas.redo()

  stage = new PrimaryStage {
    title = "Circle Drawer"
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

class CircleDrawerCanvas extends Canvas(400, 400) {
  var circles = Seq[Circle]()
  var hovered: Circle = null

  val diameter = new Button("Diameter...")
  val popup = new Popup()
  popup.content.add(diameter)

  diameter.onAction = (e: ActionEvent) => {
    popup.hide()
    showDialog(hovered)
  }
  onMousePressed = (e: MouseEvent) => {
    if (e.isPrimaryButtonDown && hovered == null) {
      addCircle(new Circle(e.x, e.y))
      onMouseMoved.get.handle(e)
    }
    if (popup.isShowing) popup.hide()
    if (e.isPopupTrigger && hovered != null)
      popup.show(this, e.screenX, e.screenY)
  }
  onMouseMoved = (e: MouseEvent) => {
    hovered = getNearestCircleAt(e.x, e.y)
    draw()
  }
  draw()

  def draw() = {
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

  def addCircle(circle: Circle) {
    circles = circles :+ circle
    addSnapshot()
  }

  def getNearestCircleAt(x: Double, y: Double) = {
    var circle: Circle = null
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

  def showDialog(selected: Circle) {
    val dialog = new Stage()
    val info = new Label(s"Adjust diameter of circle at (${selected.x}, ${selected.y})")
    val slider = new Slider(10, 50, selected.d)

    // We need to regain the identity of the selected circly by using its index in the list.
    // Tradeoff: Immutability makes undo/redo easier but we lose identity which would have been convenient here.
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

  var history = Seq[Seq[Circle]](Seq())
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

case class Circle(x: Double, y: Double, d: Double = 30)