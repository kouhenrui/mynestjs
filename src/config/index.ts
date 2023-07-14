const conf = {
  writeUrl: ['/api/auth/login', '/api/swag','/api/app/test','/api/auth/regist','/api/app/get/gaptcha'],
  saltRounds:10,//密码盐加密轮数
  port: 3000,
  jwt: {
    secretKey: '651UHCNkNVeuwshfv78@##$%^',
  },
  redisExp:{
    captchaExp:2*60
  },

  mysql : {
    type: "mysql",
    name: 'mysql',
    host: '192.168.245.33',
    port: 3306,
    username: 'root',
    password: "123456",
    database: 'test',
    charset: 'utf8mb4',
  },

  redis: {
    port: 6379,
    host: '192.168.245.33',
    db: 6,
  },
  click_house: {
    host: '192.168.245.33',
    port: 8123,
    username: '',
    password: '',
    database: '',
  },
};

export default conf;
