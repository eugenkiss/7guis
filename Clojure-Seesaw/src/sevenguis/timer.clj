(ns sevenguis.timer
  (:use [seesaw core border]
    sevenguis.core)
  (:require [seesaw.bind :as b]))

(defn format-elapsed [elapsed]
  (str (-> (/ elapsed 10.0) Math/floor int) "." (mod elapsed 10) "s"))

(defn processing [elapsed duration]
  (while true
    (when (< @elapsed @duration)
	    (Thread/sleep 100)
		  (swap! elapsed inc))
    (Thread/sleep 1)))

(defn timer-panel []
  (let [elapsed       (atom 0)
        duration      (atom 200)
        progress-bar  (progress-bar :value 0 :max @duration)
        elapsed-label (label :text "0ms")
        slider        (slider :value @duration :min 1 :max 400)
        reset         (button :text "Reset")]
    (b/bind elapsed progress-bar)
    (b/bind 
      elapsed
      (b/transform #(format-elapsed %))
      elapsed-label)
    (b/bind slider duration)
    (b/bind
      (b/funnel elapsed duration)
      (b/transform (fn [[e d]] (Math/max (or e @elapsed) (or d @duration))))
      (b/property progress-bar :max))
    (listen reset :action (fn [_] (reset! elapsed 0)))
    (-> #(processing elapsed duration) Thread. .start)
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