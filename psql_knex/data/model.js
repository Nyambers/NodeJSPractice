import knex from 'knex'

import {knexfile} from '../knexfile.js'

const env = process.env.NODE_ENV || 'development'
const configOptions = knexfile[env]

const Knex = knex(configOptions)

export async function insert(name) {
    return Knex('users')
        .insert({ name: name })
}

export async function retrieveAll() {
    return Knex('users')
        .select('id', 'name')
        .from('users')
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
}

export async function retrieve(id) {
    return Knex('users')
        .select('id', 'name')
        .from('users')
        .where({id: id})
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
}

export async function update(id, name) {
    return Knex('users')
        .where({id: id})
        .update({
            name: name
        })
}