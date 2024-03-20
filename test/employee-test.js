const 
  chai = require('chai')
  expect = chai.expect
  Employee = require('../src/entities/employee')

describe('Employee', () => {

  it('is defined', () => {
    Employee()
  })

  it('has some properties', () => {
    const employee = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')

    expect(employee.firstName).to.be.equal('Daniele')
    expect(employee.lastName).to.be.equal('Megna')
    expect(employee.email).to.be.equal('megna.dany@github.com')
    expect(employee.dateOfBirth).to.be.deep.equal(moment('1990-09-19'))
  })

  it('is equal to another employee', () => {
    const first = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
    const second = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')

    expect(first).to.be.deep.equal(second)
  })

  it('is different from another employee', () => {
    const first = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
    const second = new Employee('Filippo', 'Verdi', moment('1990-10-07'), 'filippo.verdi@github.com')

    expect(first).to.not.be.deep.equal(second)
  })

})
