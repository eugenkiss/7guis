package sevenguis.timer

import scalafx.application.{Platform, JFXApp}
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{VBox, HBox}
import scalafx.geometry.Insets
import scalafx.event.ActionEvent
import scalafx.Includes._
import scala.concurrent.duration._

import rx._
import rx.ops._
import scala.concurrent.ExecutionContext.Implicits.global
import sevenguis.RxIntegration._

object TimerRx extends JFXApp {
  val progress = new ProgressBar()
  val numericProgress = new Label()
  val slider = new Slider(1, 400, 200)
  val reset = new Button("Reset")

  val elapsed = Var(0)
  progress.progress |= elapsed() / slider.value.rx()()
  numericProgress.text |= formatElapsed(elapsed())
  reset.onAction = (event: ActionEvent) =>  elapsed() = 0

  implicit val scheduler = new AkkaScheduler(akka.actor.ActorSystem())
  val t = rx.ops.Timer(100 millis)
  // If JavaFX was thread-safe (pipe-dream?) then `Platform.runLater` would be unnecessary.
  val o = Obs(t) { Platform.runLater(if (elapsed() < slider.value.rx()()) elapsed() += 1) }

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

  def formatElapsed(elapsed: Int): String = {
    val seconds = (elapsed / 10.0).floor
    val dezipart = elapsed % 10
    seconds.toInt + "." + dezipart.toInt + "s"
  }
}
