package sevenguis.counter

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Button, TextField}
import scalafx.scene.layout.HBox
import scalafx.geometry.Insets
import scalafx.event.ActionEvent
import scalafx.Includes._
import org.reactfx.EventStreams
import scalafx.scene.input.MouseEvent
import java.util.function.Consumer
import javafx.scene.input

import sevenguis.ReactFXIntegration._

object CounterReactFX extends JFXApp {
  val count = new TextField {
    text      = "0"
    editable  = false
    prefWidth = 50
  }
  val countUp = new Button("Count")

  val clicks = EventStreams.eventsOf(countUp, MouseEvent.MouseClicked)
  clicks.subscribe((e: input.MouseEvent) => count.text = (1 + count.text.value.toInt).toString)

  stage = new PrimaryStage {
    title = "Counter"
    scene = new Scene {
      content = new HBox(10) {
        padding = Insets(10)
        content = Seq(count, countUp)
      }
    }
  }
}
