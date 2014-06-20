package sevenguis.timer

import java.time.Duration
import java.util.function.{Function, BiFunction}

import org.reactfx.{EventStreams, EitherEventStream, EventStream}

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{VBox, HBox}
import scalafx.geometry.Insets

import org.reactfx.EventStreams._
import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

// This one has the same semantics as Timer.java
// https://gist.github.com/TomasMikula/1013e56be2f282416274
object TimerReactFX2 extends JFXApp {
  val progress = new ProgressBar()
  val numericProgress = new Label()
  val slider = new Slider(1, 400, 200)
  val reset = new Button("Reset")

  type A = javafx.event.ActionEvent
  type T = org.reactfx.util.Either[A, Double]
  val resets = reset.actions
  val ticks: EventStream[Double] = EventStreams.ticks(Duration.ofMillis(100)).asInstanceOf[EventStream[Double]]
  val x: EitherEventStream[A, Double] = resets.or(ticks)
  val elapsed: EventStream[Double] = x.accumulate(0.0, ((e, ev) => ev.unify((r => 0): (A => Double), (t => if (e < slider.value()) e + 1 else e): (Double => Double))): ((Double, T) => Double))

  progress.progress |= combine(elapsed, slider.value).map(((e, s) => e / s.doubleValue()): ((Double, Number) => Number))
  numericProgress.text |= elapsed.map((e => formatElapsed(e)): (Double => String))

  stage = new PrimaryStage {
    title = "Timer"
    scene = new Scene {
      content = new VBox(10) {
        padding = Insets(10)
        content =
          Seq(new HBox(10) { content = Seq(new Label("Elapsed Time: "), progress) },
              numericProgress,
              new HBox(10) { content = Seq(new Label("Duration: "), slider) },
              reset)
      }
    }
  }

  def formatElapsed(elapsed: Double): String = {
    val seconds = (elapsed / 10.0).floor
    val dezipart = elapsed % 10
    seconds.toInt + "." + dezipart.toInt + "s"
  }
}
