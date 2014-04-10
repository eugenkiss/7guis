(ns sevenguis.core)
(use 'clojure.repl)
(use 'seesaw.core)
(use 'seesaw.dev)

(def main-frame (frame))

(defn display [content]
  (config! main-frame :content content) 
  (pack! main-frame)
  (show! main-frame) 
  content)
