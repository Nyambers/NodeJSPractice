const knexfile = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const configOptions = knexfile[env]

const Knex = require('knex')(configOptions)

async function insert(name) {
    return Knex('users')
        .insert({ name: name })
        .returning('id')
}

async function retrieveAll() {
    return Knex('users')
        .select('*')
        .from('users')
        .then((users) => {
            return users
        })
        .catch((err) => {
            console.error(err);
            return {success: false, message: 'An error occurred, please try again later.'}
        })
}

async function retrieve(id) {
    return Knex('users')
        .select('*')
        .from('users')
        .where({id: id})
        .then((users) => {
            return users
        })
        .catch((err) => {
            console.error(err);
            return {success: false, message: 'An error occurred, please try again later.'}
        })
}

async function update(id, name, info) {
    return Knex('users')
        .where({id: id})
        .update({
            name: name,
            info: info
        })
}

async function deleteUser(id) {
    return Knex('users')
        .where({id: id})
        .del()
}

module.exports.insert = insert
module.exports.retrieveAll = retrieveAll
module.exports.retrieve = retrieve
module.exports.update = update
module.exports.deleteUser = deleteUser
