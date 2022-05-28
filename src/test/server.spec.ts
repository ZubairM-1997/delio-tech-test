import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'

chai.use(chaiHttp);

describe('/profitOrLoss/:ticker', () => { 
    it('it should calculate profit or loss if correct ticker symbol is entered', async () => {
        const response = await chai.request(server).get('/profitOrLoss/MSFT')

        expect(response.status).equal(200)
        expect(typeof response.body.profitOrLoss_currentPrice_prevClosePrice).to.eql("string")
        expect(typeof response.body.result).to.eql("string")
    })
 })

 describe('/profitOrLoss/:ticker', () => { 
    it('it should return error message if incorrect ticket is entered', async () => {
        const response = await chai.request(server).get('/profitOrLoss/123XYZ')

        expect(response.status).equal(404)
        expect(response.body.errorMessage).equal('Stock not found in database')
    })
 })

 describe('/currentCheapestStock', () => {
    it('it should return the cheapest stock from database', async () => {
        const response = await chai.request(server).get('/currentCheapestStock')

        expect(response.status).equal(200)
        expect(typeof response.body.cheapest).to.eql("string")
    })
 })

 describe('/mostFluctuating', () => {
    it('it should return the cheapest stock from database', async () => {
        const response = await chai.request(server).get('/mostFluctuating')

        expect(response.status).equal(200)
        expect(typeof response.body.mostFluctuatingStock).to.eql("string")
    })
 })

 describe('/highestOpenPrice', () => {
    it('it should return the cheapest stock from database', async () => {
        const response = await chai.request(server).get('/highestOpenPrice')

        expect(response.status).equal(200)
        expect(typeof response.body.highestOpenPrice).to.eql("string")
    })
 })


