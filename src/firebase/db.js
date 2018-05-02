import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

export const doCreateRequest = (title, description, directions, owner, status, claimer) =>
  db.ref(`requests/`).push({
    title,
    description,
    directions,
    owner,
    status,
    claimer
  });

export const onceGetRequests = () =>
  db.ref('requests').once('value');


export const doClaimRequest = (id, status, claimer) => {
  db.ref(`requests/${id}`).update({
    status,
    claimer
  });
}

export const doFinishRequest = (id, status) => {
  db.ref(`requests/${id}`).update({
    status
  });
}