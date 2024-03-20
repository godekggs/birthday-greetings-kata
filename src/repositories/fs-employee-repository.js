const Employee = require('../entities/employee')
  moment = require('moment')

function FSEmployeeRepository(fileContent) {

  this.fileContent = fileContent 

  this.all = function() {
    return fileContent
      .split("\n")
      .filter(l => !isEmpty(l))
      .filter(l => !isHeader(l))
      .map(lineToEmployee)
  }

  function isEmpty(line) { return line == '' }
  function isHeader(line) { return line.startsWith("last_name") }

  function lineToEmployee(line) {
    const parsed = /([a-zA-Z\s]+), ([a-zA-Z\s]+), (\d+\/\d+\/\d+), (.+\@.+\..+)/.exec(line)
    return new Employee(
      parsed[2],
      parsed[1],
      moment(parsed[3], 'YYYY/MM/DD'),
      parsed[4]
    )
  }
  
}

module.exports = FSEmployeeRepository
