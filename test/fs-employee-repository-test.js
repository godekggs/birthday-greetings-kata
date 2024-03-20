const 
  chai = require('chai')
  expect = chai.expect
  FSEmployeeRepository = require('../src/repositories/fs-employee-repository')
  Employee = require('../src/entities/employee')

describe('FSEmployeeRepository', () => {

  describe('all method', () => {

    it('returns an empty array when created from an empty string', () => {
      const repo = new FSEmployeeRepository('')
      expect(repo.all()).to.have.lengthOf(0)
      expect(repo.all()).to.deep.eq([])
    })

    it('return an Employee array when created from some file records', () => {
      const fileContent =
        "last_name, first_name, date_of_birth, email\n" +
        "Megna, Daniele, 1990/09/19, megna.dany@github.com\n" +
        "Doe, John, 1982/10/08, john.doe@foobar.com\n" +
        "Ann, Mary, 1975/09/11, mary.ann@foobar.com"
      const repo = new FSEmployeeRepository(fileContent)

      const employees = repo.all()

      expect(employees).to.have.lengthOf(3)
      expect(employees[0].firstName).to.be.equal('Daniele')
      expect(employees[0].dateOfBirth.isSame(moment('1990-09-19'))).to.be.true
      expect(employees[1].lastName).to.be.equal('Doe')
      expect(employees[2].email).to.be.equal('mary.ann@foobar.com')
    })

    it('it works properly with last names within spaces', () => {
      const fileContent =
        "last_name, first_name, date_of_birth, email\n" +
        "Di Prova, Samuele, 1987/07/13, diprova.@github.com"
      const repo = new FSEmployeeRepository(fileContent)

      const employees = repo.all()

      expect(employees).to.have.lengthOf(1)
      expect(employees[0].firstName).to.be.equal('Samuele')
      expect(employees[0].lastName).to.be.equal('Di Prova')
    })


  })

})
