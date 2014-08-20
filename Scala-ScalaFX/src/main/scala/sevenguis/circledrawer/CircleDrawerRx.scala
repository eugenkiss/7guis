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

import rx._
import sevenguis.RxIntegration._

object CircleDrawerRx extends JFXApp {
  val undo = new Button("Undo")
  val redo = new Button("Redo")
  val canvas = new CircleDrawerCanvasRx()

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

class CircleDrawerCanvasRx extends Canvas(400, 400) {
  var circles = Seq[CircleRx]()

  val mouse_x = Var(0.0); val mouse_y = Var(0.0)
  onMouseMoved = (e: MouseEvent) => { mouse_x() = e.x; mouse_y() = e.y }
  val hovered = Rx{ getNearestCircleAt(mouse_x(), mouse_y()) }
  val o = Obs(hovered) { draw() }

  val diameter = new Button("Diameter...")
  val popup = new Popup()
  popup.content.add(diameter)

  diameter.onAction = (e: ActionEvent) => {
    popup.hide()
    showDialog(Var(hovered()))
  }
  onMousePressed = (e: MouseEvent) => {
    if (e.isPrimaryButtonDown && hovered() == null) {
      addCircle(new CircleRx(e.x, e.y))
      onMouseMoved.get.handle(e)
    }
    if (popup.isShowing) popup.hide()
    if (e.isPopupTrigger && hovered() != null)
      popup.show(this, e.screenX, e.screenY)
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
      if (c == hovered()) {
        g.setFill(Color.LIGHTGRAY)
        g.fillOval(c.x-offset, c.y-offset, c.d, c.d)
      }
      g.strokeOval(c.x-offset, c.y-offset, c.d, c.d)
    }
  }

  def addCircle(circle: CircleRx) {
    circles = circles :+ circle
    addSnapshot()
  }

  def getNearestCircleAt(x: Double, y: Double) = {
    var circle: CircleRx = null
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

  def showDialog(selected: Rx[CircleRx]) {
    val dialog = new Stage()
    val info = new Label(s"Adjust diameter of circle at (${selected().x}, ${selected().y})")
    val slider = new Slider(10, 50, selected().d)

    // Note: Dangerous because the GC could remove the observers before the dialog is closed.
    // (Which indeed happens sometimes)

    // The following "binding expression" is not ideal.
    // It would be clearer if I made `d` an Rx so then I would write:
    //   selected().d = slider.value
    // And later to forget the slider to let it be gc-ed:
    //   dialog.onCloseRequest = () => selected().d = Var(selected().d()); addSnapshot()
    // But I don't want to change the CircleRx class as I don't want to assume I can
    // change the model.
    Rx{ selected().d = slider.value.rx()() }
    // Of course, I could have used an observer but then we have inversion of control again
    //   Obs(slider.value.rx) { selected().d = slider.value() }

    // Ideally, the circles list would be reactive and on any change the canvas is redrawn
    // automatically (by registering an observer on list changes). Then the following
    // observer be unnecessary.
    Obs(slider.value.rx) { draw() }
    dialog.onCloseRequest = (e: WindowEvent) => addSnapshot()

    dialog.scene = new Scene() {
      content = new VBox(10) {
        padding = Insets(10)
        content = Seq(info, slider)
      }
    }
    dialog.show()
  }

  var history = Seq[Seq[CircleRx]](Seq())
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

case class CircleRx(x: Double, y: Double, var d: Double = 30)
