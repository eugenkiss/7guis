(ns cljguis.counter
  (:use [seesaw core]
        cljguis.core))

(defn counter-panel []
  (let [counter (text :text "0" :columns 5 :editable? false) 
        countup (button :text "Count Up")
        countdown (button :text "Count Down")
        reset (button :text "Reset")
        count-action 
          (fn [f] (fn [e] (text! counter 
                    (f (read-string (config counter :text)) 1))))]
    (listen countup :action (count-action +))
    (listen countdown :action (count-action -))
    (listen reset :action (fn [e] (text! counter "0")))
    (flow-panel :items [counter countup countdown reset])))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Converter" :content (counter-panel) :on-close :exit) 
     pack!
     show!)))