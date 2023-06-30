import { join } from 'path';
import { DbLogger } from './log4js';

const EntityPath = join(__dirname + '/../../src/entity/*.entity{.ts,.js}');
const conf = {
  port: 3000,
  jwt:{
    secretKey:"651UHCNkNVeuwshfv78@##$%^",
  },
  
  mysql: {
    type: 'mysql',
    name: 'mysql1',
    host: '140.210.193.227',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'Test',
    charset: 'utf8mb4',
    entities: [EntityPath],
    multipleStatements: true,
    dropSchema: false,
    synchronize: false, //同步数据
    logging: true,
    logger: new DbLogger(),
    cache: false,
    connectTimeout: 20000,
  },

  redis: {
    port: 6379,
    host: '54.211.28.230',
    password: 'M0@hAbnlAbG8K',
  },
};

export default conf;
