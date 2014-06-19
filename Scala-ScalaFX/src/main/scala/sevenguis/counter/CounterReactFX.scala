package sevenguis.counter

import java.util.function.{Function, BiFunction}
import javafx.event.ActionEvent

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control.{Button, TextField}
import scalafx.scene.layout.HBox
import scalafx.geometry.Insets
import org.reactfx.{EventStream, EventStreams}
import scalafx.scene.input.MouseEvent
import javafx.scene.input

import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

// https://gist.github.com/TomasMikula/d0c5bd845b2a5db32cd2
object CounterReactFX extends JFXApp {
  val count = new TextField {
    text      = "0"
    editable  = false
    prefWidth = 50
  }
  val countUp = new Button("Count")

  // Works
  val clicks = EventStreams.eventsOf(countUp, MouseEvent.MouseClicked)
  clicks.subscribe((e: input.MouseEvent) => count.text = (1 + count.text.value.toInt).toString)

  // For the following, the IDE does not report errors, but compilation fails with: https://gist.github.com/eugenkiss/c9f520a97e95e25651d1
//  count.text |= countUp.actions.accumulate(0, (n: Int, _: javafx.event.ActionEvent) => n + 1)
  // Similar Error.
//  countUp.actions.accumulate(0, new BiFunction[Int,javafx.event.ActionEvent,Int] {
//    override def andThen[V](after: Function[_ >: Int, _ <: V]): BiFunction[Int, ActionEvent, V] = super.andThen(after)
//    override def apply(t: Int, u: ActionEvent): Int = t + 1
//  })

  stage = new PrimaryStage {
    title = "Counter"
    scene = new Scene {
      content = new HBox(10) {
        padding = Insets(10)
        content = Seq(count, new Button(countUp))
      }
    }
  }
}
