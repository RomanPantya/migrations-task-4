/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async pgm => {
    await pgm.sql(`
        create table users(
            id serial primary key,
            name varchar
        );
    `)
};

exports.down = async pgm => {
    await pgm.sql(`
        drop table users;
    `)
};
