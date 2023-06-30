const dtoToEntity = (dto: any, entity: any) => {
    for (const key in entity) {
        if (dto.hasOwnProperty(key)) {
            entity[key] = dto[key];
        }
    }
    for (const key in entity) {
        if (entity[key] == undefined) {
            delete entity[key]
        }
    }

}


const entityDelNull = (entity: any) => {

    for (const key in entity) {
        if (entity[key] == undefined) {
            delete entity[key]
        }
    }

}

const entityToDto = (entity: any, dto: any) => {
    for (const key in dto) {
        if (entity.hasOwnProperty(key)) {
            dto[key] = entity[key];
        }
    }
}

export {
    dtoToEntity,
    entityDelNull,
    entityToDto
}