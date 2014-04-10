(ns seveguis.temperature
  (:use [seesaw core]
        sevenguis.core)
  (:require [seesaw.bind :as b]))

(defn numeric? [s]
  (try (Double/parseDouble (.trim s)) true
       (catch NumberFormatException e false)))

(defn f-to-c [f]
  (* (- f 32) 5/9))

(defn c-to-f [c]
  (+ (* c 9/5) 32))

(defn parse-temp [s]
  (Double/parseDouble (.trim s)))

(defn display-temp [n]
  (str (Math/round (float n))))

(defn convert-panel []
  (let [celsius    (text :columns 5) 
        fahrenheit (text :columns 5)]
    (b/bind  
      celsius 
      (b/filter #(and (.isFocusOwner celsius) (numeric? %)))
      (b/transform #(-> % parse-temp c-to-f display-temp))
      fahrenheit)
    (b/bind 
      fahrenheit 
      (b/filter #(and (.isFocusOwner fahrenheit) (numeric? %)))
      (b/transform #(-> % parse-temp f-to-c display-temp))
      celsius)
    (flow-panel 
      :items [celsius "Celsius" "=" fahrenheit "Fahrenheit"])))

(defn -main [& args] 
  (invoke-later    (-> (frame :title "Temperature Converter" :content (convert-panel) :on-close :exit)      pack!     show!)))