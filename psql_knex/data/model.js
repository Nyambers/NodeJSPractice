const knexfile = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const configOptions = knexfile[env]

const Knex = require('knex')(configOptions)

const fs = require('fs')

const pubKey = fs.readFileSync('./keys/public.key').toString()
const secretKey = fs.readFileSync('./keys/secret.key').toString()
const password = process.env.SECRET_KEY_PASSWORD

async function insert(name) {
    return Knex('users')
        .insert({ name: Knex.raw("pgp_pub_encrypt(?, dearmor(?))", [name, pubKey]) })
        .returning('id')
}

async function retrieveAll() {
    return Knex('users')
        .select(
            "id",
            Knex.raw("pgp_pub_decrypt(??, dearmor(?), ?) AS name", ["name", secretKey, password]),
            "info"
        )
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
        .select(
            "id",
            Knex.raw("pgp_pub_decrypt(??, dearmor(?), ?) AS name", ["name", secretKey, password]),
            "info"
        )
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
            name: Knex.raw("pgp_pub_encrypt(?, dearmor(?))", [name, pubKey]),
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
