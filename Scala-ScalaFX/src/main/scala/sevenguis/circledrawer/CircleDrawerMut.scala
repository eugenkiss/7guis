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

// The difference here is that we can mutate the diameter of a circle and that we therefore need a deep
// copy of the circles list so as to not break the undo/redo functionality (see `addSnapshot`).
// That means, we need to make sure that we really can deeply copy our application state.
// If yes, we get the best of both worlds from the OO and the FP approach, i.e. we have easy undo/redo
// support and we still retain identity where we need it (see slider listener in `showDialog`).
// The price to pay is inefficiency compared to the OO approach (and possibly to the FP aproach as well)
// but if the introduced inefficiency is not noticeable by the user it is well worth the expense.

object CircleDrawerMut extends JFXApp {
  val undo = new Button("Undo")
  val redo = new Button("Redo")
  val canvas = new CircleDrawerCanvasMut()

  undo.onAction = (event: ActionEvent) => canvas.undo()
  redo.onAction = (event: ActionEvent) => canvas.redo()

  stage = new PrimaryStage {
    title = "Circle Drawer Mut"
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

class CircleDrawerCanvasMut extends Canvas(400, 400) {
  var circles = Seq[CircleMut]()
  var hovered: CircleMut = null

  val diameter = new Button("Diameter...")
  val popup = new Popup()
  popup.content.add(diameter)

  diameter.onAction = (e: ActionEvent) => {
    popup.hide()
    showDialog(hovered)
  }
  onMousePressed = (e: MouseEvent) => {
    if (e.isPrimaryButtonDown && hovered == null) {
      addCircle(new CircleMut(e.x, e.y))
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

  def addCircle(circle: CircleMut) {
    circles = circles :+ circle
    addSnapshot()
  }

  def getNearestCircleAt(x: Double, y: Double) = {
    var circle: CircleMut = null
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

  def showDialog(selected: CircleMut) {
    val dialog = new Stage()
    val info = new Label(s"Adjust diameter of circle at (${selected.x}, ${selected.y})")
    val slider = new Slider(10, 50, selected.d)

    slider.value.addListener((v: ObservableValue[_ <: Number], o: Number, n: Number) => {
      selected.d = n.doubleValue()
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

  var history = Seq[Seq[CircleMut]](Seq())
  var historyCursor = 0

  def addSnapshot() = {
    history = history.take(historyCursor+1) :+ circles.map(_.copy())
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

case class CircleMut(x: Double, y: Double, var d: Double = 30)