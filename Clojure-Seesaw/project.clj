(defproject Clojure-Seesaw "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :repl-options { :init (do
                          (use 'clojure.repl)
                          (use 'seesaw.dev))}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [seesaw "1.4.4"]                 
                 [instaparse "1.3.1"]
                 ])
