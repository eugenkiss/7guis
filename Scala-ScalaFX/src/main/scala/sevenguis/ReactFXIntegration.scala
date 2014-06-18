package sevenguis

import java.util.Objects
import java.util.function.Consumer

import org.reactfx.{Subscription, EventStreams, EventStream}
import rx._
import Scala2Java8._


object ReactFXIntegration {
  implicit def obsValToStream[T](p: javafx.beans.value.ObservableValue[T]): EventStream[T] =
    EventStreams.valuesOf(p)

  implicit class PropertyExtensions[T,J](p: scalafx.beans.property.Property[T,J]) {
    def |=(s: EventStream[_ <: J]): Subscription = s.subscribe(new Consumer[J]() {
      override def accept(t: J): Unit = p.setValue(t)
      override def andThen(after: Consumer[_ >: J]): Consumer[J] = super.andThen(after)
    })
  }

  implicit class PropertyExtensionsJ[T](p: javafx.beans.property.Property[T]) {
    def |=(s: EventStream[_ <: T]): Subscription = s.subscribe(new Consumer[T]() {
      override def accept(t: T): Unit = p.setValue(t)
      override def andThen(after: Consumer[_ >: T]): Consumer[T] = super.andThen(after)
    })
  }

  implicit class NodeExtensions(n: scalafx.scene.Node) {
    def actions: EventStream[javafx.event.ActionEvent] =
      EventStreams.eventsOf(n, javafx.event.ActionEvent.ACTION)
  }

  implicit class NodeExtensionsJ(n: javafx.scene.Node) {
    def actions: EventStream[javafx.event.ActionEvent] =
      EventStreams.eventsOf(n, javafx.event.ActionEvent.ACTION)
  }
}
