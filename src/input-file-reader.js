function InputFileReader(myWindow, myDocument, outputFn) {

  this.read = function(elementId, onContentLoaded) {
    if(!isBrowserSupported())
      return

    if(!isDocumentValid())
      return

    const inputfile = myDocument.getElementById('inputfile')
    if(!isFileValid(inputfile))
      return

    readFile(inputfile, onContentLoaded)
  }

  function readFile(inputfile, onContentLoaded) {
    const fileReader = new myWindow.FileReader()
    fileReader.onload = ((e) => {
      onContentLoaded(e.target.result)
    })
    fileReader.readAsText(inputfile.files[0])
  }


  function isBrowserSupported() {
    if (!myWindow || !myWindow.File || !myWindow.FileReader || !myWindow.FileList || !myWindow.Blob) {
      outputFn('The File APIs are not fully supported in this browser.')
      return false
    }

    return true
  }

  function isDocumentValid() {
    if (!myDocument || !myDocument.getElementById) {
      outputFn('The provided document seems not valid.')
      return false
    }

    return true
  }

  function isFileValid(inputfile) {
    if (!inputfile) {
      outputFn("Um, couldn't find the inputfile element.")
      return false
    }

    if (!inputfile.files) {
      outputFn("This browser doesn't seem to support the `files` property of file inputs.")
      return false
    }

    if (!inputfile.files[0]) {
      outputFn("Please select a file before.")
      return false
    }

    return true
  }

}

module.exports = InputFileReader
