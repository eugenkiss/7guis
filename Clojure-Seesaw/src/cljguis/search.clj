; Adapted from https://github.com/daveray/seesaw/blob/develop/test/seesaw/test/examples/bind.clj

(ns cljguis.search
  (:use [seesaw core]
        cljguis.core)
  (:require [seesaw.bind :as b]))

(defn regex-panel []
  (let [pattern (text :id :search :columns 20)
        status  (label :text "Ready")]
    (b/bind
      pattern
      (b/transform #(try (re-pattern %) (catch Exception e nil)))
      (b/tee
        (b/bind
          (b/transform #(if % "white" "lightcoral"))
          (b/property pattern :background))
        (b/bind
          (b/transform #(if % "Ready" "Invalid regex"))
          status)))
    (border-panel
      :north "Enter a search string:"
      :center pattern
      :south status 
      :vgap 5 :border 5)))
  
(defn search-panel []
  (let [enable-box (checkbox :text "Enable search" :selected? true) 
        regex-panel (regex-panel)]
    (b/bind 
      (b/selection enable-box)
      (b/property (select regex-panel [:#search]) :enabled?))
    (border-panel
      :north enable-box
      :center regex-panel)))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Search Box" :content (search-panel) :on-close :exit) 
     pack!
     show!)))
