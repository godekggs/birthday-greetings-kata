const 
  chai = require('chai')
  expect = chai.expect
  Email = require('../src/entities/email')

describe('Email', () => {

  it('is defined', () => {
    Email()
  })

  it('has some public members', () => {
    const email = new Email('Happy birthday!', 'Happy birthday, dear Daniele!', 'daniele.megna@github.com')

    expect(email.subject).to.be.equal('Happy birthday!')
    expect(email.body).to.be.equal('Happy birthday, dear Daniele!')
    expect(email.recipient).to.be.equal('daniele.megna@github.com')
  })

  it('is equal to another email', () => {
    const first = new Email('Happy birthday!', 'Happy birthday, dear Daniele!', 'daniele.megna@github.com')
    const second = new Email('Happy birthday!', 'Happy birthday, dear Daniele!', 'daniele.megna@github.com')

    expect(first).to.deep.equal(second)
  })

  it('is different from another email', () => {
    const first = new Email('Happy birthday!', 'Happy birthday, dear Daniele!', 'daniele.megna@github.com')
    const second = new Email('Internal comunication', 'This is an internal comunication', 'daniele.megna@github.com')

    expect(first).to.not.deep.equal(second)
  })

  it('has a toString function', () => {
    const email = new Email('Happy birthday!', 'Happy birthday, dear Daniele!', 'daniele.megna@github.com')
    const expected =
      'To: <daniele.megna@github.com>\n' +
      'Subject: "Happy birthday!"\n' +
      'Body:\n' +
      '\n' +
      'Happy birthday, dear Daniele!'

    expect(email.toString()).to.be.equal(expected)
  })

})
