package sevenguis.timer

import java.time.Duration

import org.reactfx.{StateMachine, EventStreams, EventStream}

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{VBox, HBox}
import scalafx.geometry.Insets

import org.reactfx.EventStreams._
import sevenguis.ReactFXIntegration._
import sevenguis.Scala2Java8._

// https://gist.github.com/TomasMikula/1013e56be2f282416274
object TimerReactFX extends JFXApp {
  val progress = new ProgressBar()
  val numericProgress = new Label()
  val slider = new Slider(1, 400, 200)
  val reset = new Button("Reset")

  val resets = reset.actions
  val ticks: EventStream[_] = EventStreams.ticks(Duration.ofMillis(100))
  val elapsed: EventStream[Double] = StateMachine.init((0.0, slider.value()))
          .on(resets).transition({case ((e, s), r) => (0.0, s)}: (((Double, Double), javafx.event.ActionEvent) => ((Double, Double))))
          .on(ticks).transition ({case ((e, s), t) => (e + (if (e < s) 1 else 0), s)}: (((Double, Double), Any) => ((Double, Double))))
          .on(slider.value).transition ({case ((e, s), s1) => (e, s1.doubleValue())}: (((Double, Double), Number) => ((Double, Double))))
          .toStateStream.map({case (e, s) => e}: (((Double, Double)) => Double))

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
