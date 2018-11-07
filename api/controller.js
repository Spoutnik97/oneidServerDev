const fetch = require('node-fetch');

const express = require('express'),
  jwt = require('jsonwebtoken'),
  app = express(),
  keys = process.env.KEY_JWT || '123AZERTYUIP';

const randomstring = require('randomstring');

async function insertData(kind, data) {
  return new Promise((async (resolve, reject) => {
    const res = await fetch('http://myoneid.fr/api/dev/insert', {
      method: 'post',
      body: `kind=${kind}&data=${JSON.stringify(data)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(err => console.log(`Erreur de transmmission des données INSERT : ${err}`));
    resolve(res.json());
  }));
}

async function updateData(kind, id, data) {
  return new Promise((async (resolve, reject) => {
    const res = await fetch('http://myoneidfr/api/dev/update', {
      method: 'post',
      body: `kind=${kind}&id=${id}&data=${JSON.stringify(data)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(err => console.log(`Erreur de transmmission des données UPDATE :${err}`));

    resolve(res.json());
  }));
}

// return : { success: true/false, response: (object), id: (object id)}
function getData(kind, key, value) {
  return new Promise((async (resolve, reject) => {
    const res = await fetch('http://myoneid.fr/api/dev/get', {
      method: 'post',
      body: `kind=${kind}&key=${key}&value=${value}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch(err => console.log(`Erreur de transmmission des données GET : ${err}`));

    const r = res.json();
    resolve(r);
  }));
}


exports.test = async function (req, res) {
  console.log(`Data received in the body : ${JSON.stringify({ ...req.body })}`);
  console.log(`Data received in the params : ${JSON.stringify({ ...req.params })}`);

  const resultGet = await getData('pro_services', 'proservice', 'testsoge');
  console.log(`resultat get :${JSON.stringify(resultGet)}`);

  // insertData('devDatabase', { proservice: 'devtest', admin: 'test' });
  //
  // const resultUpdate = getData('p', 'proservice', 'testsoge');

  res.status(200).json({ message: 'The connection was successful ! ', params: JSON.stringify({ ...req.params }), body: JSON.stringify({ ...req.body }) });
};
