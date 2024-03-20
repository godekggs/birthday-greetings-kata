const Email = require('./entities/email')

function BirthdayService(employeeRepository, emailService) {
  
  this.employeeRepository = employeeRepository
  this.emailService = emailService

  this.sendGreetings = function(today) {
    employeeRepository
      .all()
      .filter(hasBirthdayOn(today))
      .forEach((employee) => {
        this.emailService.send(buildBirthdayEmail(employee))
      })
  }

  function hasBirthdayOn(today) {
    return function(employee) {
      const employeeDateOfBirth = employee.dateOfBirth
      return employeeDateOfBirth.month() == today.month() && employeeDateOfBirth.date() == today.date()
    }
  }

  function buildBirthdayEmail(employee) {
      return new Email('Happy birthday!', 'Happy birthday, dear ' + employee.firstName + '!', employee.email)
  }
  
}

module.exports = BirthdayService
