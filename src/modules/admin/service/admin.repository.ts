import { Injectable } from '@nestjs/common';
import { Admin } from '../model/admin.entity';

@Injectable()
export class AdminRepository {
  private readonly admins: Admin[];
  constructor() {
    this.admins = [
      // {
      //   id: 1,
      //   login: 'admin',
      //   passwordHash: 'password',
      //   nickName: "Kakyojin Noriaki"
      // },
    ];
  }

  async find(id: number): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.id === id);
  }

  async findByLogin(login: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.login === login);
  }
}
