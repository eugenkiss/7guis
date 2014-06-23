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

  type A = javafx.event.ActionEvent
  type T = org.reactfx.util.Either[A, Double]
  val resets = reset.actions
  val ticks: EventStream[javafx.event.ActionEvent] = EventStreams.ticks(Duration.ofMillis(100)).asInstanceOf[EventStream[javafx.event.ActionEvent]]
  val elapsed: EventStream[Double] = StateMachine.init((0.0, slider.value()))
          .on(resets).transition(((tup_es, r) => (0.0, tup_es._2)): (((Double, Double), javafx.event.ActionEvent) => ((Double, Double))))
          .on(ticks).transition (((tup_es, t) => (tup_es._1 + (if (tup_es._1 < tup_es._2) 1 else 0), tup_es._2)): (((Double, Double), javafx.event.ActionEvent) => ((Double, Double))))
          .on(slider.value).transition (((tup_es, s1) => (tup_es._1, s1.doubleValue())): (((Double, Double), Number) => ((Double, Double))))
          .toStateStream.map((tup_es => tup_es._1): (((Double, Double)) => Double))

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
