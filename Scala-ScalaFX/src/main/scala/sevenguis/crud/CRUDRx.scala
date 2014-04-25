package sevenguis.crud

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{GridPane, BorderPane, HBox}
import scalafx.geometry.{Pos, Insets}
import scalafx.event.ActionEvent
import scalafx.Includes._
import javafx.beans.value.ObservableValue
import javafx.collections.FXCollections
import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

import rx._

// Somewhat similar to the Clojure/Seesaw solution in terms of the watches.
// The FilterableView class is not really beneficial anymore because the logic is simpler now.
// The prefix.text listener is not necessary anymore as well.

object CRUDRx extends JFXApp {
  val prefix = new TextField() { prefWidth = 60 }
  val name = new TextField() { prefWidth = 100 }
  val surname = new TextField() { prefWidth = 100 }
  val create = new Button("Create")
  val update = new Button("Update") { disable = true }
  val delete = new Button("Delete") { disable = true }
  val entries = new ListView[String]()
  entries.getSelectionModel.selectionMode = SelectionMode.SINGLE

  val database = Var(ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman"))
  val prefix_text = Var("")
          val o0 = Obs(prefix_text) { prefix.text = prefix_text() }
          prefix.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
            prefix_text() = n.toString)
  val filteredView = Rx{ database().zip(0 to database().size-1).filter(_._1.startsWith(prefix_text())).unzip }
  val o = Obs(filteredView) { entries.setItems(FXCollections.observableArrayList(filteredView()._1.asJava)) }

  // These properties were not transformed into Rxs as they are clear as is.
  val fullname = surname.textProperty.concat(", ").concat(name.textProperty)
  val selectedIndex = entries.getSelectionModel.selectedIndexProperty()
  def selectedOrigIndex = filteredView()_2 selectedIndex.get
  // Ideally, I would not have to write 'database.update(database())'.
  // ScalaRx needs an updateInplace function or something similar.
  create.onAction = (event: ActionEvent) => { database() += fullname.get; database.update(database()) }
  delete.onAction = (event: ActionEvent) => { database().remove(selectedOrigIndex); database.update(database()) }
  update.onAction = (event: ActionEvent) => { database().update(selectedOrigIndex, fullname.get); database.update(database()) }
  delete.disable <== selectedIndex === -1
  update.disable <== selectedIndex === -1

  // An ideal solution would look something like the following.
  //val database = Var(ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman"))
  //val filteredView = Rx{ database().zip(0 to database().size-1).filter(_._1.startsWith(prefix_text())).unzip }
  //entries.setItems(filteredView._1) // setItems automatically does the right thing when given an Rx
  //
  //val fullname = Rx{ s"${surname.text()}, ${name.text()}" }
  //val selectedIndex = entries.getSelectionModel.selectedIndex
  //val selectedOrigIndex = Rx{ filteredView()_2 selectedIndex() }
  //Obs(create.onAction) { database() += fullname.get }
  //Obs(delete.onAction) { database().remove(selectedOrigIndex) }
  //Obs(update.onAction) { database().update(selectedOrigIndex, fullname() }
  //delete.disable = Rx{ selectedIndex == -1 }
  //update.disable = Rx{ selectedIndex == -1 }

  stage = new PrimaryStage {
    title = "CRUD"
    scene = new Scene {
      content = new BorderPane() {
        padding = Insets(10)
        prefWidth = 400
        prefHeight = 400
        top = new HBox(10) {
          padding = Insets(0,0,10,0)
          alignment = Pos.BASELINE_LEFT
          content = Seq(new Label("Filter prefix: "), prefix)
        }
        center = entries
        right = new GridPane() {
          padding = Insets(0,0,0,10)
          hgap = 10
          vgap = 10
          addRow(0, new Label("Name: "), name)
          addRow(1, new Label("Surname: "), surname)
        }
        bottom = new HBox(10) {
          padding = Insets(10,0,0,0)
          content = Seq(create, update, delete)
        }
      }
    }
  }
}

