const moment = require('moment')
  FSEmployeeRepository = require('./src/repositories/fs-employee-repository')
  BirthdayService = require('./src/birthday-service')
  InputFileReader = require('./src/input-file-reader')

window.processFile = function () {

  new InputFileReader(window, document, alert).read('inputfile', (fileContent) => {
    const employeeRepository = new FSEmployeeRepository(fileContent)
    const emailService = { send: (email) => alert(email) }
    const service = new BirthdayService(employeeRepository, emailService)

    service.sendGreetings(moment())
  })

}

