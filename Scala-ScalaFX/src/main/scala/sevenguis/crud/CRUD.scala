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
import javafx.collections.{ListChangeListener, FXCollections}
import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer
import javafx.collections.ListChangeListener.Change
import java.util.function.Predicate

object CRUD extends JFXApp {
  val prefix = new TextField() { prefWidth = 60 }
  val name = new TextField() { prefWidth = 100 }
  val surname = new TextField() { prefWidth = 100 }
  val create = new Button("Create")
  val update = new Button("Update") { disable = true }
  val delete = new Button("Delete") { disable = true }
  val entries = new ListView[String]()
  entries.getSelectionModel.selectionMode = SelectionMode.SINGLE

  val externDb = ArrayBuffer[String]("Emil, Hans", "Mustermann, Max", "Tisch, Roman")
  val db = FXCollections.observableArrayList(externDb.asJava)
  db.addListener(new ListChangeListener[String] {
    override def onChanged(c: Change[_ <: String]): Unit = {
      while (c.next) {
        if (c.wasReplaced()) externDb.update(c.getFrom, c.getAddedSubList.get(0))
        else {
          if (c.wasAdded()) externDb.append(c.getAddedSubList.get(0))
          if (c.wasRemoved()) externDb.remove(c.getFrom)
        }
      }
    }
  })
  val dbView = db.filtered(new Predicate[String] {
    override def or(other: Predicate[_ >: String]): Predicate[String] = ???
    override def and(other: Predicate[_ >: String]): Predicate[String] = ???
    override def negate(): Predicate[String] = ???
    override def test(t: String): Boolean = true
  })
  entries.setItems(dbView)

  // The following doesn't work: val fullname = surname.text + ", " + name.text
  val fullname = surname.textProperty.concat(", ").concat(name.textProperty)
  val selectedIndex = entries.getSelectionModel.selectedIndexProperty()
  prefix.text.addListener((v: ObservableValue[_ <: String], o: String, n: String) =>
    dbView.setPredicate(new Predicate[String] {
      override def or(other: Predicate[_ >: String]): Predicate[String] = ???
      override def and(other: Predicate[_ >: String]): Predicate[String] = ???
      override def negate(): Predicate[String] = ???
      override def test(t: String): Boolean = t.startsWith(n)
    }))
  create.onAction = (event: ActionEvent) => db.add(fullname.get)
  delete.onAction = (event: ActionEvent) => db.remove(dbView.getSourceIndex(selectedIndex.get))
  update.onAction = (event: ActionEvent) => db.set(dbView.getSourceIndex(selectedIndex.get), fullname.get)
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

