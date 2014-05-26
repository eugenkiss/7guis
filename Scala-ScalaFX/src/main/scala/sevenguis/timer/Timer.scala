package sevenguis.timer

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{VBox, HBox}
import scalafx.geometry.Insets
import scalafx.event.ActionEvent
import scalafx.Includes._
import scalafx.beans.property.DoubleProperty
import javafx.beans.value.ObservableValue
import scalafx.animation.{KeyFrame, Timeline}
import scalafx.util.Duration
import javafx.beans.binding.Bindings
import java.util.concurrent.Callable

object Timer extends JFXApp {
  val progress = new ProgressBar()
  val numericProgress = new Label()
  val slider = new Slider(1, 400, 200)
  val reset = new Button("Reset")

  val elapsed = DoubleProperty(0)
  progress.progress <== elapsed / slider.value
  // Ideally: numericProgress.text <== formatElapsed(elapsed)
  numericProgress.text <== Bindings.createStringBinding(new Callable[String] { override def call(): String =
    formatElapsed(elapsed())
  }, elapsed)
  reset.onAction = (event: ActionEvent) =>  elapsed() = 0

  val timeline = Timeline(KeyFrame(Duration(100), "", (e: ActionEvent) =>
    if (elapsed() < slider.value()) elapsed() = elapsed() + 1))
  timeline.setCycleCount(Timeline.INDEFINITE)
  timeline.play()

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
