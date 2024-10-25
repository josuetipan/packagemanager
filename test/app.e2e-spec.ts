import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest'; // Para hacer peticiones HTTP
import { AppModule } from '../src/app.module'; // Importa tu módulo raíz

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Se ejecuta antes de todas las pruebas
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule], // Aquí importamos el módulo de la app
    }).compile();

    // Creamos una instancia de la app Nest
    app = moduleFixture.createNestApplication();
    await app.init(); // Inicia la aplicación en modo de pruebas
  });

  // Ejemplo de test para la ruta raíz "/"
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200) // Verifica que el código de estado sea 200 (OK)
      .expect('Hello World!'); // Verifica el contenido de la respuesta
  });

  // Se ejecuta después de todas las pruebas
  afterAll(async () => {
    await app.close(); // Cierra la aplicación después de las pruebas
  });
});
