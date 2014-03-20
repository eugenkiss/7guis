; Adapted from https://github.com/daveray/seesaw/blob/develop/test/seesaw/test/examples/temp.clj

(ns cljguis.temp
  (:use [seesaw core]
        cljguis.core)
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
  (let [celsius-input (text) 
        fahrenheit-input (text)]
    (b/bind celsius-input 
            (b/filter #(and (.isFocusOwner celsius-input) (numeric? %)))
            (b/transform #(-> % parse-temp c-to-f display-temp))
            fahrenheit-input)
    (b/bind fahrenheit-input 
            (b/filter #(and (.isFocusOwner fahrenheit-input) (numeric? %)))
            (b/transform #(-> % parse-temp f-to-c display-temp))
            celsius-input)
    (grid-panel 
        :columns 2
        :items [celsius-input    "Celsius" 
                fahrenheit-input "Fahrenheit" ])))

(defn -main [& args] 
  (invoke-later    (-> (frame :title "TempConv" :content (convert-panel) :on-close :exit)      pack!     show!)))