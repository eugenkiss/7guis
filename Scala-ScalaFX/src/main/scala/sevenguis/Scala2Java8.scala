package sevenguis

// https://github.com/xuwei-k/Scala2Java8/blob/master/Scala2Java8.scala

import java.util.concurrent.Callable
import java.util.function._
//import scala.language.implicitConversions

trait Scala2Java8{
  implicit def biConsumer[A, B](f: (A, B) => Unit): BiConsumer[A, B] = new BiConsumer[A, B]{
    override def accept(a: A, b: B) = f(a, b)
    override def andThen(after: BiConsumer[_ >: A, _ >: B]): BiConsumer[A, B] = super.andThen(after)
  }
//  implicit def biFunction[A, B, C](f: (A, B) => C): BiFunction[A, B, C] = new BiFunction[A, B, C]{
//    override def apply(a: A, b: B) = f(a, b)
//    override def andThen[V](after: Function[_ >: C, _ <: V]): BiFunction[A, B, V] = super.andThen(after)
//  }
  implicit def binaryOperator [A](f: (A, A) => A): BinaryOperator[A] = new BinaryOperator[A]{
    override def apply(a: A, b: A) = f(a, b)
    override def andThen[V](after: Function[_ >: A, _ <: V]): BiFunction[A, A, V] = super.andThen(after)
  }
  implicit def biPredicate[A, B](f: (A, B) => Boolean): BiPredicate[A, B] = new BiPredicate[A, B]{
    override def test(a: A, b: B) = f(a, b)
    override def and(other: BiPredicate[_ >: A, _ >: B]): BiPredicate[A, B] = super.and(other)
    override def negate(): BiPredicate[A, B] = super.negate()
    override def or(other: BiPredicate[_ >: A, _ >: B]): BiPredicate[A, B] = super.or(other)
  }
  implicit def booleanSupplier(f: () => Boolean): BooleanSupplier = new BooleanSupplier{ override def getAsBoolean() = f() }
  implicit def consumer[A](f: A => Unit): Consumer[A] = new Consumer[A]{
    override def accept(a: A) = f(a)
    override def andThen(after: Consumer[_ >: A]): Consumer[A] = super.andThen(after)
  }
  implicit def doubleBinaryOperator(f: (Double, Double) => Double): DoubleBinaryOperator = new DoubleBinaryOperator{ override def applyAsDouble(a: Double, b: Double) = f(a, b) }
  implicit def doubleConsumer(f: Double => Unit): DoubleConsumer = new DoubleConsumer{
    override def accept(a: Double) = f(a)
    override def andThen(after: DoubleConsumer): DoubleConsumer = super.andThen(after)
  }
  implicit def doubleFunction[A](f: Double => A): DoubleFunction[A] = new DoubleFunction[A]{ override def apply(a: Double) = f(a) }
  implicit def doublePredicate(f: Double => Boolean): DoublePredicate = new DoublePredicate{
    override def test(a: Double) = f(a)
    override def and(other: DoublePredicate): DoublePredicate = super.and(other)
    override def negate(): DoublePredicate = super.negate()
    override def or(other: DoublePredicate): DoublePredicate = super.or(other)
  }
  implicit def doubleSupplier(f: () => Double): DoubleSupplier = new DoubleSupplier{ override def getAsDouble() = f() }
  implicit def doubleToIntFunction(f: Double => Int): DoubleToIntFunction = new DoubleToIntFunction{ override def applyAsInt(a: Double) = f(a) }
  implicit def doubleToLongFunction(f: Double => Long): DoubleToLongFunction = new DoubleToLongFunction{ override def applyAsLong(a: Double) = f(a) }
  implicit def doubleUnaryOperator(f: Double => Double): DoubleUnaryOperator = new DoubleUnaryOperator{
    override def applyAsDouble(a: Double) = f(a)
    override def compose(before: DoubleUnaryOperator): DoubleUnaryOperator = super.compose(before)
    override def andThen(after: DoubleUnaryOperator): DoubleUnaryOperator = super.andThen(after)
  }
  implicit def function[A, B](f: A => B): Function[A, B] = new Function[A, B]{
    override def apply(a: A) = f(a)
    override def compose[V](before: Function[_ >: V, _ <: A]): Function[V, B] = super.compose(before)
    override def andThen[V](after: Function[_ >: B, _ <: V]): Function[A, V] = super.andThen(after)
  }
  implicit def intBinaryOperator(f: (Int, Int) => Int): IntBinaryOperator = new IntBinaryOperator{ override def applyAsInt(a: Int, b: Int) = f(a, b) }
  implicit def intConsumer(f: Int => Unit): IntConsumer = new IntConsumer{
    override def accept(a: Int) = f(a)
    override def andThen(after: IntConsumer): IntConsumer = super.andThen(after)
  }
  implicit def intFunction[A](f: Int => A): IntFunction[A] = new IntFunction[A]{ override def apply(a: Int) = f(a) }
  implicit def intPredicate(f: Int => Boolean): IntPredicate = new IntPredicate{
    override def test(a: Int) = f(a)
    override def and(other: IntPredicate): IntPredicate = super.and(other)
    override def negate(): IntPredicate = super.negate()
    override def or(other: IntPredicate): IntPredicate = super.or(other)
  }
  implicit def intSupplier(f: () => Int): IntSupplier = new IntSupplier{ override def getAsInt() = f() }
  implicit def intToDoubleFunction(f: Int => Double): IntToDoubleFunction = new IntToDoubleFunction{ override def applyAsDouble(a: Int) = f(a) }
  implicit def intToLongFunction(f: Int => Long): IntToLongFunction = new IntToLongFunction{ override def applyAsLong(a: Int) = f(a) }
  implicit def intUnaryOperator(f: Int => Int): IntUnaryOperator = new IntUnaryOperator{
    override def applyAsInt(a: Int) = f(a)
    override def compose(before: IntUnaryOperator): IntUnaryOperator = super.compose(before)
    override def andThen(after: IntUnaryOperator): IntUnaryOperator = super.andThen(after)
  }
  implicit def longBinaryOperator(f: (Long, Long) => Long): LongBinaryOperator = new LongBinaryOperator{ override def applyAsLong(a: Long, b: Long) = f(a, b) }
  implicit def longConsumer(f: Long => Unit): LongConsumer = new LongConsumer{
    override def accept(a: Long) = f(a)
    override def andThen(after: LongConsumer): LongConsumer = super.andThen(after)
  }
  implicit def longFunction[A](f: Long => A): LongFunction[A] = new LongFunction[A]{ override def apply(a: Long) = f(a) }
  implicit def longPredicate(f: Long => Boolean): LongPredicate = new LongPredicate{
    override def test(a: Long) = f(a)
    override def and(other: LongPredicate): LongPredicate = super.and(other)
    override def negate(): LongPredicate = super.negate()
    override def or(other: LongPredicate): LongPredicate = super.or(other)
  }
  implicit def longSupplier(f: () => Long): LongSupplier = new LongSupplier{ override def getAsLong() = f() }
  implicit def longToDoubleFunction(f: Long => Double): LongToDoubleFunction = new LongToDoubleFunction{ override def applyAsDouble(a: Long) = f(a) }
  implicit def longToIntFunction(f: Long => Int): LongToIntFunction = new LongToIntFunction{ override def applyAsInt(a: Long) = f(a) }
  implicit def longUnaryOperator(f: Long => Long): LongUnaryOperator = new LongUnaryOperator{
    override def applyAsLong(a: Long) = f(a)
    override def compose(before: LongUnaryOperator): LongUnaryOperator = super.compose(before)
    override def andThen(after: LongUnaryOperator): LongUnaryOperator = super.andThen(after)
  }
  implicit def objDoubleConsumer[A](f: (A, Double) => Unit): ObjDoubleConsumer[A] = new ObjDoubleConsumer[A]{ override def accept(a: A, b: Double) = f(a, b) }
  implicit def objIntConsumer[A](f: (A, Int) => Unit): ObjIntConsumer[A] = new ObjIntConsumer[A]{ override def accept(a: A, b: Int) = f(a, b) }
  implicit def objLongConsumer[A](f: (A, Long) => Unit): ObjLongConsumer[A] = new ObjLongConsumer[A]{ override def accept(a: A, b: Long) = f(a, b) }
  implicit def predicate[A](f: A => Boolean): Predicate[A] = new Predicate[A]{
    override def test(a: A) = f(a)
    override def and(other: Predicate[_ >: A]): Predicate[A] = super.and(other)
    override def negate(): Predicate[A] = super.negate()
    override def or(other: Predicate[_ >: A]): Predicate[A] = super.or(other)
  }
  implicit def supplier[A](f: () => A): Supplier[A] = new Supplier[A]{ override def get() = f() }
  implicit def toDoubleBiFunction[A, B](f: (A, B) => Double): ToDoubleBiFunction[A, B] = new ToDoubleBiFunction[A, B]{ override def applyAsDouble(a: A, b: B) = f(a, b) }
  implicit def toDoubleFunction[A](f: A => Double): ToDoubleFunction[A] = new ToDoubleFunction[A]{ override def applyAsDouble(a: A) = f(a) }
  implicit def toIntBiFunction[A, B](f: (A, B) => Int): ToIntBiFunction[A, B] = new ToIntBiFunction[A, B]{ override def applyAsInt(a: A, b: B) = f(a, b) }
  implicit def toIntFunction[A](f: A => Int): ToIntFunction[A] = new ToIntFunction[A]{ override def applyAsInt(a: A) = f(a) }
  implicit def toLongBiFunction[A, B](f: (A, B) => Long): ToLongBiFunction[A, B] = new ToLongBiFunction[A, B]{ override def applyAsLong(a: A, b: B) = f(a, b) }
  implicit def toLongFunction[A](f: A => Long): ToLongFunction[A] = new ToLongFunction[A]{ override def applyAsLong(a: A) = f(a) }
//  implicit def unaryOperator[A](f: A => A): UnaryOperator[A] = new UnaryOperator[A]{
//    override def apply(a: A) = f(a)
//    override def compose[V](before: Function[_ >: V, _ <: A]): Function[V, A] = super.compose(before)
//    override def andThen[V](after: Function[_ >: A, _ <: V]): Function[A, V] = super.andThen(after)
//  }
  implicit def fun2Call[R](f: () => R) = new Callable[R] { def call : R = f() }

}

object Scala2Java8 extends Scala2Java8

