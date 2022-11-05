/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async pgm => {
    await pgm.sql(`
        alter table users
        add column age integer;
    `)
};

exports.down = async pgm => {
    await pgm.sql(`
        alter table users
        drop column age;
    `)
};
