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
import rx._

/*
I think if one refactored the code drastically one could benefit from the reactive approach
(e.g. make `hovered` a reactive variable etc.). A lot of events and callbacks in this example
would stay though as they are already conceptually the right abstraction (e.g. all the mouse
events).
A more interesting question is how to use reactivity while refactoring the code as little
as possible (e.g. `Circle` stays as is). To achieve this I believe one would need additional
reactive constructs (by using a macro?) to keep the refactorings at a minimum and only introduce
reactive concepts exactly where they make sense. For example, to connect the diameter of the
selected circle with the slider it would be good to just write

  Rx{ selected.d = slider.value() }

I did not really introduce much reactivity here because I am not sure yet what the best
approach would be here. Maybe this kind of application specifically does not benefit much
from reactivity.
*/

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
  var hovered: CircleRx = null

  val diameter = new Button("Diameter...")
  val popup = new Popup()
  popup.content.add(diameter)

  diameter.onAction = (e: ActionEvent) => {
    popup.hide()
    showDialog(hovered)
  }
  onMousePressed = (e: MouseEvent) => {
    if (e.isPrimaryButtonDown && hovered == null) {
      addCircle(new CircleRx(e.x, e.y))
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

  def showDialog(selected: CircleRx) {
    val dialog = new Stage()
    val info = new Label(s"Adjust diameter of circle at (${selected.x}, ${selected.y})")
    val slider = new Slider(10, 50, selected.d)

    // Note: Possibly dangerous because the GC could in principal remove the observers afaik.
    val slider_value = Var(slider.value.get)
            val o0 = Obs(slider_value) { slider.value = slider_value() }
            slider.value.addListener((v: ObservableValue[_ <: Number], o: Number, n: Number) =>
              slider_value() = n.intValue())
    // Ideally, I would just do: Rx{ selected.d = slider.value() }
    val selected_d = Rx{ slider_value() }
            val o1 = Obs(selected_d) { selected.d = selected_d() }
    // Ideally, the circles list would be reactive and on any change the canvas is redrawn
    // automatically (by registering an observer on list changes). Then the following
    // observer be unnecessary.
    val o2 = Obs(slider_value) { draw() }
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