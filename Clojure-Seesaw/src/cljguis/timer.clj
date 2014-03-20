; Adapted from http://cs.brown.edu/~sk/Publications/Papers/Published/ick-adapt-oo-fwk-frp/paper.pdf

(ns cljguis.timer
  (:use [seesaw core border]
    cljguis.core)
  (:require [seesaw.bind :as b]))

(defn format-elapsed [elapsed]
  (str (-> (/ elapsed 10.0) Math/floor int) "." (mod elapsed 10) "s"))

(defn processing [elapsed max]
  (while true
    (when (< @elapsed @max)
	    (Thread/sleep 100)
		  (swap! elapsed inc))
    (Thread/sleep 1)))

(defn timer-panel []
  (let [elapsed       (atom 0)
        max           (atom 200)
        progress-bar  (progress-bar :value 0 :max @max)
        elapsed-label (label :text "0ms")
        slider        (slider :value @max :min 1 :max 400)
        reset         (button :text "Reset")]
    (b/bind elapsed progress-bar)
    (b/bind 
      elapsed
      (b/transform #(format-elapsed %))
      elapsed-label)
    (b/bind slider max)
    (b/bind
      (b/funnel elapsed max)
      (b/transform (fn [_] (Math/max @elapsed @max)))
      (b/property progress-bar :max))
    (listen reset :action (fn [_] (reset! elapsed 0)))
    (-> #(processing elapsed max) Thread. .start)
    (grid-panel 
      :rows 4
      :border (empty-border :thickness 10)
      :items [(horizontal-panel :items ["Elapsed time: " progress-bar])
              elapsed-label
              (horizontal-panel :items ["Duration: " slider])
              reset])))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Timer" :content (timer-panel) :on-close :exit) 
      pack!
      show!)))