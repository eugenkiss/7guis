module.exports = function(publicPath, outputFilename) {
  if (document) {
    var newHref = publicPath.match(/https?:/g) ? new URL(outputFilename, publicPath) : new URL(publicPath + outputFilename, window.location);
    var links = document.getElementsByTagName('link');

	//update the stylesheet corresponding to `outputFilename`
    for (var i = 0; i < links.length; i++) {
      if (links[i].href) {
        var oldChunk = new URL(links[i].href);

        if (oldChunk.pathname === newHref.pathname) {
          var oldSheet = links[i]
          var url = newHref.href + '?' + (+new Date)
          var head = document.getElementsByTagName('head')[0]
          var link = document.createElement('link')

          // date insures sheets update when [contenthash] is not used in file names
          link.href = url
          link.charset = 'utf-8'
          link.type = 'text/css'
          link.rel = 'stylesheet'

          head.insertBefore(link, oldSheet.nextSibling)

          // remove the old sheet only after the old one loads so it's seamless
          // we gotta do it this way since link.onload basically doesn't work
          var img = document.createElement('img')
          img.onerror = function() {
            oldSheet.remove()
            console.log('[HMR]', 'Reload css: ', url);
          }
          img.src = url
          break;
        }
      }
    }
  }
}
