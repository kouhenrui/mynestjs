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
   * @description 验证权限是否存在
   * @author khr
   * @Date:
   * @return:
   */
  async enforce(sub: string, obj: string, act: string): Promise<boolean> {
    return this.enforcer.enforce(sub, obj, act);
  }

  /**
   * @description 增加权限
   * @author khr
   * @Date:
   * @return:
   */
  async addPolicy(sub: string, obj: string, act: string): Promise<void> {
    await this.enforcer.addPolicy(sub, obj, act);
    await this.enforcer.savePolicy();
  }

  /**
   * @description 删除权限
   * @author khr
   * @Date:
   * @return:
   */
  async removePolicy(sub: string, obj: string, act: string): Promise<void> {
    await this.enforcer.removePolicy(sub, obj, act);
    await this.enforcer.savePolicy();
  }

  /**
   * @description 增加权限
   * @author khr
   * @Date:
   * @return:
   */
  async addRole(role: string, permission: string): Promise<void> {
    await this.enforcer.addPolicy(role, permission);
    await this.enforcer.savePolicy();
  }

  /**
   * @description 删除角色
   * @author khr
   * @Date:
   * @return:
   */
  async removeRole(role: string, permission: string): Promise<void> {
    await this.enforcer.removePolicy(role, permission);
    await this.enforcer.savePolicy();
  }

  /**
   * @description 修改角色
   * @author khr
   * @Date:
   * @return:
   */
  async updateRole(oldRole: string, newRole: string): Promise<void> {
    const rolePolicies = await this.enforcer.getFilteredPolicy(0, oldRole);
    for (const policy of rolePolicies) {
      await this.enforcer.removePolicy(...policy);
      await this.enforcer.addPolicy(newRole, ...policy.slice(1));
    }
    await this.enforcer.savePolicy();
  }

  /**
   * @description GetRolesForUser 获取用户具有的角色
   * @author khr
   * @Date:
   * @return:
   */
  async getRolesForUser(policy: string) {
    return await this.enforcer.getRolesForUser(policy);
  }

  /**
   * @description GetUsersForRole 获取具有角色的用户
   * @author khr
   * @Date:
   * @return:
   */
  async getUserForRole(user) {
    await this.enforcer.loadPolicy()
    return await this.enforcer.getUsersForRole(user);
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
}
