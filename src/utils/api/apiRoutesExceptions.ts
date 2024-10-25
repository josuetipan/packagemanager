import { apiBaseEntityName } from './apiEntites';

export const routesExceptions = {
  notFound: [
    {
      method: 'GET',
      path: '/msa/retrieveidentificationtypes/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'DELETE',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'PUT',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'POST',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'POST',
      path: '/msa/users/2.0',
      entity: apiBaseEntityName,
    },
  ],
  badRequest: [
    {
      method: 'DELETE',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'PUT',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'POST',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
  ],
  forbidden: [],
  unauthorized: [], // Arreglo vacío para Unauthorized
  serviceUnavailable: [], // Arreglo vacío para Service Unavailable
  conflict: [], // Arreglo vacío para Conflict
  internalServerError: [], // Arreglo vacío para Internal Server Error
  methodNotAllowed: [
    {
      method: 'POST',
      path: '/msa/users/1.0',
      entity: apiBaseEntityName,
    },
    {
      method: 'POST',
      path: '/msa/users/2.0',
      entity: apiBaseEntityName,
    },
  ],
  // Agrega más estados según sea necesario
};
