import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class MongoLogService {
  constructor(
    @InjectConnection('log') private logConnection: Connection,
    // @InjectModel('Log','log') private readonly logModel: Model<any>
    // @InjectModel('logCollection', 'log') private logModel: Model<any>,
  ) {}
  // async create(log){
  //   return await this.logModel.create(log)
  // }
//   async getUsers(): Promise<any[]> {
//     return this.logConnection.collection('logs').find().toArray();
//   }

//   async getUserById(id: string): Promise<any> {
//     return this.logConnection.collection('logs').findOne({id});
//   }

//   async createLog(log): Promise<any> {
//     return this.logConnection.collection('logs').insertOne(log);
//   }

// //   async updateUser(id: string, updatedUser: any): Promise<any> {
// //     return this.logConnection.collection('logs').updateOne();
// //   }

//   async deleteUser(id: string): Promise<any> {
//     return this.logConnection.collection('logs').deleteOne();
//   }
}

@Injectable()
export class MongoRbacService {
  constructor(
    @InjectConnection('rbac') private logConnection: Connection,
  ) {}
  //权限创建
  async createRbac(data: any): Promise<any> {
    return await this.logConnection.collection('rbac').insertOne(data);
  }
  async findAllRbac(): Promise<any[]> {
    return await this.logConnection.collection('rbac').find().toArray()
  }

  async findByIdRbac(id: string): Promise<any> {
    return await this.logConnection.collection('rbac').findOne({id})
  }

  // async updateRbac(id: string, data: any): Promise<any> {
  //   return await this.logConnection.collection('rbac')
  //     .findByIdAndUpdate(id, data, { new: true })
  //     .exec();
  // }

  async deleteRbac(id: string): Promise<any> {
    return await this.logConnection.collection('rbac').deleteOne({id});
  }
}
