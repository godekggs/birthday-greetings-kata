const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  moment = require('moment')
  BirthdayService = require('../src/birthday-service')
  Employee = require('../src/entities/employee')
  Email = require('../src/entities/email')

describe('BirthdayService', () => {

  it('is defined', () => {
    BirthdayService()
  })

  describe('sendGreetings', () => {

    it('do nothing with no stored employee', () => {
      const employeeRepository = stubEmployeeRepository([])
      const emailService = stubEmailService()
      const mockEmailService = sinon.mock(emailService)
      const service = new BirthdayService(stubEmployeeRepository([]), emailService)

      mockEmailService.expects('send').never()

      const anyDate = moment('2017-10-07')
      service.sendGreetings(anyDate)

      mockEmailService.verify()
    })

    it('do nothing when there are no birthday', () => {
      const employeeRepository = stubEmployeeRepository([
        new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
      ])
      const emailService = stubEmailService()
      const mockEmailService = sinon.mock(emailService)
      const service = new BirthdayService(stubEmployeeRepository([]), emailService)

      mockEmailService.expects('send').never()

      const today = moment('2017-10-07')
      service.sendGreetings(today)

      mockEmailService.verify()
    })

    it('send an email when is an employee birthday', () => {
      const employeeRepository = stubEmployeeRepository([
        new Employee('Filippo', 'Verdi', moment('1990-10-07'), 'filippo.verdi@github.com'),
        new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
      ])
      const emailService = stubEmailService()
      const mockEmailService = sinon.mock(emailService)
      const service = new BirthdayService(employeeRepository, emailService)

      const expectedEmail = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'filippo.verdi@github.com')
      mockEmailService.expects('send').exactly(1).withArgs(expectedEmail)

      const today = moment('2017-10-07')
      service.sendGreetings(today)

      mockEmailService.verify()
    })

    it('send an email for every single birthday', () => {
      const employeeRepository = stubEmployeeRepository([
        new Employee('Filippo', 'Verdi', moment('1990-10-07'), 'filippo.verdi@github.com'),
        new Employee('Gabriele', 'Rossi', moment('1988-10-07'), 'gabriele.rossi@github.com'),
        new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
      ])
      const emailService = stubEmailService()
      const mockEmailService = sinon.mock(emailService)
      const service = new BirthdayService(employeeRepository, emailService)

      const mailForFilippo = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'filippo.verdi@github.com')
      const mailForGabriele = new Email('Happy birthday!', 'Happy birthday, dear Gabriele!', 'gabriele.rossi@github.com')
      mockEmailService.expects('send').exactly(1).withArgs(mailForFilippo)
      mockEmailService.expects('send').exactly(1).withArgs(mailForGabriele)

      const today = moment('2017-10-07')
      service.sendGreetings(today)

      mockEmailService.verify()
    })

  })

})

function stubEmployeeRepository(storedEmployees) {
  const employeeRepository = { all: () => {} }
  sinon.stub(employeeRepository, 'all').returns(storedEmployees)
  return employeeRepository
}

function stubEmailService() {
  return { send: () => {} }
}
