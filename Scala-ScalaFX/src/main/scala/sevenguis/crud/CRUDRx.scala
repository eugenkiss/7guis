package sevenguis.crud

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.control._
import scalafx.scene.layout.{GridPane, BorderPane, HBox}
import scalafx.geometry.{Pos, Insets}
import scalafx.event.ActionEvent
import scalafx.Includes._
import javafx.collections.FXCollections
import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

import rx._
import sevenguis.RxIntegration._

object CRUDRx extends JFXApp {
  val prefix = new TextField() { prefWidth = 60 }
  val name = new TextField() { prefWidth = 100 }
  val surname = new TextField() { prefWidth = 100 }
  val create = new Button("Create")
  val update = new Button("Update") { disable = true }
  val delete = new Button("Delete") { disable = true }
  val entries = new ListView[String]()
  entries.getSelectionModel.selectionMode = SelectionMode.SINGLE

  // An ideal solution would look something like the following.
  //val database = Var(ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman"))
  //val dbView = Rx{ db().zip(0 to db().size-1).filter(_._1.startsWith(prefix.text())).unzip }
  //entries.setItems(dbView._1) // setItems automatically does the right thing when given an Rx[Collection]

  val externDb = ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman")
  val db = Var(externDb)
  val dbView = Rx{ db().zip(0 to db().size-1).filter(_._1.startsWith(prefix.text.rx()())).unzip }
  val o = Obs(dbView) { entries.setItems(FXCollections.observableArrayList(dbView()._1.asJava)) }

  val fullname = Rx{ s"${surname.text.rx()()}, ${name.text.rx()()}" }
  val selectedIndex = entries.getSelectionModel.selectedIndexProperty().rx()
  val sourceIndex = Rx{ dbView()_2 selectedIndex().intValue }
  // Ideally, I would write database() += fullname()
  create.onAction = (event: ActionEvent) => { db() = db() += fullname() }
  // Ideally, I would not need database.update(database())
  delete.onAction = (event: ActionEvent) => { db().remove(sourceIndex()); db.update(db()) }
  // Ideally, I would not need database.update(database())
  update.onAction = (event: ActionEvent) => { db().update(sourceIndex(), fullname()); db.update(db()) }
  delete.disable |= selectedIndex().intValue == -1
  update.disable |= selectedIndex().intValue == -1


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

