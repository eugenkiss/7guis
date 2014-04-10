(ns sevenguis.cells
  (:use [seesaw core color]
    clojure.data
    sevenguis.core)
  (:require [seesaw.bind :as b]
            [instaparse.core :as insta]))

;; Domain specific ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn type-str [t]
  (last (clojure.string/split (str (type t)) #"\.")))

(defprotocol Formula
  (eval   [this data])
  (refs   [this data])
  (to-str [this]))

(defrecord Textual [value]
  Formula
  (eval   [this data] 0.0)
  (refs   [this data] [])
  (to-str [this] value))

(defrecord Decimal [value]
  Formula
  (eval   [this data] value)
  (refs   [this data] [])
  (to-str [this] (str value)))

(defrecord Coord [row column]
  Formula
  (eval   [this data] (:value (get data [row column])) #_(cell-at row column data))
  (refs   [this data] [(get data [row column])])
  (to-str [this] (str (char (+ (int \A) column)) row)))

(defrecord Range [coord1 coord2]
  Formula
  (eval   [this data] Double/NaN)
  (refs   [this data] (for [row (range (:row coord1) (inc (:row coord2)))
                            col (range (:column coord1) (inc (:column coord2)))]
                        (get data [row col])))
  (to-str [this] (str (to-str coord1) ":" (to-str coord2))))

(def op-table 
  {"add" #(+ %1 %2)
   "sub" #(- %1 %2)
   "div" #(/ %1 %2)
   "mul" #(* %1 %2)
   "mod" #(mod %1 %2)
   "sum" +
   "prod" *})

(defn eval-list [formula data]
  (if (= "Range" (type-str formula))
    (map #(:value %) (refs formula data))
    [(eval formula data)]))

(defrecord Application [function arguments]
  Formula
  (eval   [this data] 
    (let [argvals (mapcat #(eval-list % data) arguments)]
      (try 
        (apply (get op-table function) argvals)
        (catch Exception e Double/NaN))))
  (refs   [this data] (mapcat #(refs % data) arguments))
  (to-str [this] (str function "(" (clojure.string/join ", " (map to-str arguments)) ")")))

(def Empty (Textual. ""))


(defn parse-formula [formula-str]
  (let [result
         ((insta/parser "
          formula = decimal / textual / (<'='> expr)
          expr    = range / cell / decimal / app
          app     = ident <'('> (expr <','>)* expr <')'>
          range   = cell <':'> cell
          cell    = #'[A-Za-z]\\d+'
          textual = #'[^=].*'
          ident   = #'[a-zA-Z_]\\w*'
          decimal = #'-?\\d+(\\.\\d*)?'
          ") formula-str)]
    (if (insta/failure? result)
      (Textual. (str (insta/get-failure result)))
      (insta/transform 
        {:decimal #(Decimal. (java.lang.Double/parseDouble %))
         :ident   str
         :textual #(Textual. %)
         :cell    #(Coord. (read-string (subs % 1))  (- (int (.charAt % 0)) (int \A)))
         :range   #(Range. %1 %2)
         :app     (fn [f & as] (Application. f (vec as)))
         :expr    identity
         :formula identity
         } result))))


(defn make-data [height width]
  (into {} (for [x (range height) y (range width)] 
             [[x y] {:x x :y y :value 0.0 :formula Empty :observers []}])))
        
(defn cell-at [x y data]
  (get @data [x y]))

(defn cell-str [{value :value formula :formula}]
  (if (= "Textual" (type-str formula))
    (to-str formula)
    (str value)))
    

;; GUI specific ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn change-prop [{x :x y :y v :value f :formula os :observers} data]
  (let [nv  (eval f @data)]
    (when-not (or (= v nv) (and (Double/.isNaN v) (Double/.isNaN nv)))
      (swap! data assoc-in [[x y] :value] nv)
      (doseq [[x y] os] (change-prop (cell-at x y data) data)))))

(defn cells-table [rows columns data]
  (doto 
    (proxy [javax.swing.JTable] [rows columns]
      (editingStopped [e]
        (let [row (.getEditingRow this)
              col (.getEditingColumn this)]
         (proxy-super editingStopped e)
         (let [formula (parse-formula (or (.getValueAt this row col) ""))
               oldform (:formula (cell-at row col data))
               value   (eval formula @data)]
           (doseq [cell (refs oldform @data)]
             (swap! data update-in [[(:x cell) (:y cell)] :observers]
               (fn [obs] (remove #(= % [row col]) obs))))
           (doseq [cell (refs formula @data)]
             (swap! data update-in [[(:x cell) (:y cell)] :observers]
               #(conj % [row col])))
           (swap! data assoc-in [[row col] :formula] formula)
           (change-prop (cell-at row col data) data))))
      (getCellRenderer [row column]
        (proxy [javax.swing.table.TableCellRenderer] []
          (getTableCellRendererComponent [table, value, isSelected, hasFocus, row, column]
            (proxy [javax.swing.JLabel] [(-> (cell-at row column data) cell-str)]
              (getHorizontalAlignment [] javax.swing.JLabel/RIGHT))))))
    (.setRowHeight 25)
    (.setAutoResizeMode javax.swing.JTable/AUTO_RESIZE_OFF)
    (.setGridColor (color "#bbbbbb"))
    (.setCellSelectionEnabled true)))

(defn cells-panel [height width]
  (let [data  (atom (make-data height width))
        table (cells-table height width data)]
    (doto 
      (javax.swing.JScrollPane.)
      (.setViewportView table)
      (.setRowHeaderView 
        (doto 
          (listbox :model (range 0 100))
          (.setFixedCellWidth 30)
          (.setFixedCellHeight 25)))
      (.setColumnHeaderView (.createDefaultTableHeader table)))))
             
(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Cells" :content (cells-panel 100 26) :on-close :exit) 
      pack!
      show!)))