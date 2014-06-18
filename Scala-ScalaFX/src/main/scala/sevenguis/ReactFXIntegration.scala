package sevenguis

import java.util.Objects
import java.util.function.Consumer

import rx._

object ReactFXIntegration {
  implicit def fToConsumer[T](f: T => Unit) = new Consumer[T]() {
    override def accept(t: T): Unit = f(t)
    override def andThen(after: Consumer[_ >: T]): Consumer[T] = super.andThen(after)
  }
//  implicit def fToConsumer[T](f: T => Unit) = new Consumer[_ >: T]() {
//    override def accept(t: _ >: T): Unit = f(t)
//  }
//  implicit def consumer[A](f: A => Unit): Consumer[_ >: A] = new Consumer[_ >: A]{
//    override def accept(a: A) = f(a)
//
//    override def andThen(after: Consumer[_ >: A]): Consumer[A] = ???
//  }
//  implicit def whateverToRunnable[F](f: => F) = new Runnable() { def run() { f } }
//  implicit def fToConsumer[F](f: => F) = new Consumer[F]() {
//    override def andThen(after: Consumer[_ >: F]): Consumer[F] = super.andThen(after)
//    override def accept(t: F): Unit = f
//  }
//  def consumer[T](f: T => Unit): Consumer[_ >: T] = new Consumer[T]() {
//    override def andThen(after: Consumer[_ >: T]): Consumer[T] = super.andThen(after)
//    override def accept(t: T): Unit = f(t)
//  }
}
