import { Injectable } from '@nestjs/common';
import { KafkaLogger } from 'kafka-logger-mm'; // Librería de Kafka
import { LoggerService } from './logger.service';
import { messageCustom } from 'src/utils/api/apiKafkaLogConfig';
import { apiBaseEntityName } from 'src/utils/api/apiEntites';

interface messageInterface {
  message: string;
  duration?: string;
  appUser?: string;
}

@Injectable()
export class LoggerKafkaService extends LoggerService {
  private kafkaLogger: KafkaLogger;

  constructor() {
    super();
    const brokers = process.env.KAFKA_BROKERS?.split(',') || ['0.0.0.0:9092'];
    const topic = process.env.KAFKA_TOPIC || 'example';

    this.kafkaLogger = new KafkaLogger(brokers, topic);
    this.kafkaLogger.connect();
  }

  async log(
    message: string | messageInterface,
    method: string = 'GET',
    entity: string = apiBaseEntityName,
  ) {
    let mensaje;
    if (typeof message === 'object') {
      mensaje = messageCustom(
        message.message,
        method,
        entity,
        'INFO',
        message.duration,
        message.appUser,
      );
    }
    if (typeof message === 'string') {
      mensaje = messageCustom(message, method, entity, 'INFO');
    }
    await super.log(JSON.stringify(mensaje));
    await this.kafkaLogger.logCustomMessage('INFO', mensaje);
  }

  async error(
    message: string | messageInterface,
    method: string = 'GET',
    entity: string = apiBaseEntityName,
  ) {
    let mensaje;

    if (typeof message === 'object') {
      mensaje = messageCustom(
        message.message,
        method,
        entity,
        'ERROR',
        message.duration,
        message.appUser,
      );
    }
    if (typeof message === 'string') {
      mensaje = messageCustom(message, method, entity, 'ERROR');
    }
    await super.error(JSON.stringify(mensaje));
    await this.kafkaLogger.logCustomMessage('ERROR', mensaje);
  }

  async warn(
    message: string | messageInterface,
    method: string = 'GET',
    entity: string = apiBaseEntityName,
  ) {
    let mensaje;
    if (typeof message === 'object') {
      mensaje = messageCustom(
        message.message,
        method,
        entity,
        'WARN',
        message.duration,
        message.appUser,
      );
    }
    if (typeof message === 'string') {
      mensaje = messageCustom(message, method, entity, 'WARN');
    }
    super.warn(JSON.stringify(mensaje));
    await this.kafkaLogger.logCustomMessage('WARN', mensaje);
  }

  async debug(
    message: string | messageInterface,
    method: string = 'GET',
    entity: string = apiBaseEntityName,
  ) {
    let mensaje;
    if (typeof message === 'object') {
      mensaje = messageCustom(
        message.message,
        method,
        entity,
        'DEBUG',
        message.duration,
        message.appUser,
      );
    }
    if (typeof message === 'string') {
      mensaje = messageCustom(message, method, entity, 'INFO');
    }
    super.debug(JSON.stringify(mensaje));
    await this.kafkaLogger.logCustomMessage('DEBUG', mensaje);
  }

  async verbose(message: string, method?: string, entity?: string) {
    const mensaje = messageCustom(message, method, entity, 'VERBOSE');
    await this.kafkaLogger.logCustomMessage('VERBOSE', mensaje);
  }
}
