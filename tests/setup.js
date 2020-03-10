/* DO NOT EDIT */

const db = require('../server/db/models')
before(() => db.sync({force: true}))
afterEach(() => db.sync({force: true}))
after(() => db.close())
