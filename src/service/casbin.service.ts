import { Inject, Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';
import { join } from 'path';
import conf from 'src/config';
import TypeORMAdapter, { CasbinRule } from 'typeorm-adapter';

@Injectable()
export class CasbinService {
  private enforcer: Enforcer;

  constructor() {
    this.initialize();
  }
  /**
   * @description 初始化适配器，将权限数据持久化存储到数据库中
   * @author khr
   * @Date:
   */
  async initialize() {
    const CasbinEnforce = await TypeORMAdapter.newAdapter({
      type: 'mysql',
      host: conf.mysql.host,
      port: conf.mysql.port,
      username: conf.mysql.username,
      password: conf.mysql.password,
      database: 'casbin',
    });
    // console.log(join(__dirname,'../../rbac.module.conf'))
    this.enforcer = await newEnforcer(
      join(__dirname, '../../rbac.module.conf'),
      CasbinEnforce,
    );
    await this.enforcer.loadPolicy();
    console.log('权限表自动创建成功');
  }

  /**
   * @description GetRolesForUser 获取用户具有的角色
   * @author khr
   * @Date:
   * @return:
   */
  async getRolesForUser(user) {
    return await this.enforcer.getRolesForUser(user);
  }

  /**
   * @description 获取策略中的所有授权规则
   * @author khr
   * @Date:
   */
  async findAllPolicy() {
    await this.enforcer.loadPolicy();
    return await this.enforcer.getPolicy();
  }
  /**
   * @description 获取当前策略中显示的角色列表
   * @author khr
   * @Date:
   */
  async findAllRoles() {
    return await this.enforcer.getAllRoles();
  }

  // 确定是否存在授权规则 例:'data2_admin', 'data2', 'read'
  async hasPolicy() {
    return await this.enforcer.hasPolicy();
  }

  /**
   * @description  AddPolicy 向当前策略添加授权许多规则
   * @author khr
   * @return boolean
   */

  async addPolicies(policies) {
    return await this.enforcer.addPolicy(policies);
  }

  /**
   * @description AddPolicy 向当前策略添加授权规则。 如果规则已经存在，函数返回false，并且不会添加规则。 否则，函数通过添加新规则并返回true。
   * @author khr
   * @Date:
   */
  async addPolicy(policy) {
    return await this.enforcer.addPolicy(policy);
  }

  /**
   * @description RemovePolicy 从当前策略中删除授权规则。
   * @author khr
   * @Date:
   */
  async removePolicy(policy) {
    return await this.enforcer.removePolicy(policy);
  }

  /**
   * @description 批量从当前策略中删除授权规则
   * @author khr
   * @return boolean
   */
  async removePolicies(policies) {
    return await this.enforcer.removePolicies(policies);
  }
}
