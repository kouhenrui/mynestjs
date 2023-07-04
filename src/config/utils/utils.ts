const dtoToEntity = (dto: any, entity: any) => {
  for (const key in entity) {
    if (dto.hasOwnProperty(key)) {
      entity[key] = dto[key];
    }
  }
  for (const key in entity) {
    if (entity[key] == undefined) {
      delete entity[key];
    }
  }
};

const entityDelNull = (entity: any) => {
  for (const key in entity) {
    if (entity[key] == undefined) {
      delete entity[key];
    }
  }
};

const entityToDto = (entity: any, dto: any) => {
  for (const key in dto) {
    if (entity.hasOwnProperty(key)) {
      dto[key] = entity[key];
    }
  }
};
const existIn = (req, writeUrl) => {
  for (let s of writeUrl) {
    if (s == req) return true;
  }
};

export { dtoToEntity, entityDelNull, entityToDto,existIn };
