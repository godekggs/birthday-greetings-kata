const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  assert = sinon.assert
  InputFileReader = require('../src/input-file-reader')
  fn = () => {}

describe('BirthdayService', () => {

  it('is defined', () => {
    InputFileReader()
  })

  describe('read', () => {

    describe('browser and input validation', () => {

      const validFakeWindow = { File: true, FileReader: true, FileList: true, Blob: true }

      it('needs a valid windows', () => {
        const invalidWindows = [
          undefined, null,
          { File: undefined, FileReader: true, FileList: true, Blob: true },
          { File: true, FileReader: undefined, FileList: true, Blob: true },
          { File: true, FileReader: true, FileList: undefined, Blob: true },
          { File: true, FileReader: true, FileList: true, Blob: undefined }
        ]

        const anyDocument = null
        invalidWindows.forEach((w) => {
          assertValidationWith(w, anyDocument, "The File APIs are not fully supported in this browser.")
        })
      })

      it('needs a valid document', () => {
        const invalidDocuments = [ undefined, null, {} ]

        invalidDocuments.forEach((d) => {
          assertValidationWith(validFakeWindow, d, "The provided document seems not valid.")
        })
      })

      it('needs a valid input element', () => {
          const inputNotPresent = { getElementById: () => { return null } }
          const inputWithoutFilesProperty = { getElementById: () => { return { files: undefined } } }
          const inputWithoutSelectedFiles = { getElementById: () => { return { files: [] } } }
          assertValidationWith(validFakeWindow, inputNotPresent, "Um, couldn't find the inputfile element.")
          assertValidationWith(validFakeWindow, inputWithoutFilesProperty, "This browser doesn't seem to support the `files` property of file inputs.")
          assertValidationWith(validFakeWindow, inputWithoutSelectedFiles, "Please select a file before.")
      })

      function assertValidationWith(fakeWindow, fakeDocument, expectedMessage) {
        const spyOutputFn = sinon.spy()
        const spyOnContentLoaded = sinon.spy()
        const reader = new InputFileReader(fakeWindow, fakeDocument, spyOutputFn)

        reader.read('anyElementId', spyOnContentLoaded)

        assert.calledOnce(spyOutputFn)
        assert.calledWith(spyOutputFn, expectedMessage)
        assert.notCalled(spyOnContentLoaded)
      }

    })

    xit('calls onContentLoaded callback with file content', () => {
      const anElementId = 'anElementId'
      const mockWindow = sinon.mock({ File: fn, FileReader: fn, FileList: fn, Blob: fn })
      const mockDocument = sinon.mock({ getElementById: fn })
      const spyOutputFn = sinon.spy()
      const spyOnContentLoaded = sinon.spy()
      const reader = new InputFileReader(fakeWindow, fakeDocument, spyOutputFn)

      reader.read(anElementId, spyOnContentLoaded)
    })

  })
})
