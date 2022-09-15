import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../admin/service/admin.repository';
import { Admin } from '../../admin/model/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  private adminRepository: Repository<Admin>;

  constructor(
    //private adminRepository: AdminRepository,
    private jwtService: JwtService,
    private connection: Connection
  ) {
    this.adminRepository = this.connection.getRepository(Admin);
    }
  async validateAdmin(login: string, pass: string): Promise<any> {
    // findOne - встроенный метод самого typeOrm
    const admin: Admin = await this.adminRepository.findOne({
      where: { login: login },
    });

    if (admin && (await bcrypt.compare(pass, admin.passwordHash))) {
      const { passwordHash, ...secureAdmin } = admin;
      return secureAdmin;
    }

    return null;
  }

  async login(admin: Admin) {
    const payload = { id: admin.id };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
