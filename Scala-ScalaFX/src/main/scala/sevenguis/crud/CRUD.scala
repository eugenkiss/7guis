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

object CRUD extends JFXApp {
  val prefix = new TextField() { prefWidth = 60 }
  val name = new TextField() { prefWidth = 100 }
  val surname = new TextField() { prefWidth = 100 }
  val create = new Button("Create")
  val update = new Button("Update") { disable = true }
  val delete = new Button("Delete") { disable = true }
  val entries = new ListView[String]()
  entries.getSelectionModel.selectionMode = SelectionMode.SINGLE

  val database = ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman")
  val filterableView = new FilterableView(database)
  entries.setItems(filterableView.filteredDatabase)

  // The following doesn't work: val fullname = surname.text + ", " + name.text
  val fullname = surname.textProperty.concat(", ").concat(name.textProperty)
  val selectedIndex = entries.getSelectionModel.selectedIndexProperty()
  prefix.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
    filterableView.filterByPrefix(n))
  create.onAction = (event: ActionEvent) => filterableView.create(fullname.get)
  delete.onAction = (event: ActionEvent) => filterableView.delete(selectedIndex.get)
  update.onAction = (event: ActionEvent) => filterableView.update(fullname.get, selectedIndex.get)
  delete.disable <== selectedIndex === -1
  update.disable <== selectedIndex === -1

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

class FilterableView(val database: ArrayBuffer[String]) {
  val filteredDatabase = FXCollections.observableArrayList[String](database.asJava)
  var filteredOriginalMap = Seq.range(0, database.size-1)
  var cachedPrefix = ""

  def filterByPrefix(prefix: String = cachedPrefix) = {
    cachedPrefix = prefix
    val (filteredDb, filteredIs) = database.zip(0 to database.size-1).filter(_._1.startsWith(prefix)).unzip
    filteredDatabase.clear()
    filteredDatabase.addAll(filteredDb.asJava)
    filteredOriginalMap = filteredIs
  }

  def create(newEntry: String) = {
    database += newEntry
    filterByPrefix()
  }

  def update(newEntry: String, index: Int) = {
    database.update(filteredOriginalMap(index), newEntry)
    filterByPrefix()
  }

  def delete(index: Int) = {
    database.remove(filteredOriginalMap(index))
    filterByPrefix()
  }
}