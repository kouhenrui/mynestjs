const conf = {
  writeUrl: ['/auth/login', '/api/swag'],
  port: 3000,
  jwt: {
    secretKey: '651UHCNkNVeuwshfv78@##$%^',
  },

  mysql : {
    type: "mysql",
    name: 'mysql1',
    host: '192.168.245.22',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'Test',
    charset: 'utf8mb4',
  },

  redis: {
    port: 6379,
    host: '192.168.245.22',
    db: 6,
  },
  click_house: {
    host: '192.168.245.22',
    port: 8123,
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  },
};

export default conf;
