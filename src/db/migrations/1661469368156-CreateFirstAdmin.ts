import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../../modules/admin/model/admin.entity';
import * as bcrypt from 'bcrypt';


export class CreateFirstAdmin1661469368156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);

    if (await adminRepository.findOne({ where: { login: 'admin' } })) {
      return;
    }

    const admin: Admin = adminRepository.create({
      login: 'admin',
      passwordHash: await bcrypt.hash('password', 10),
      nickName: 'Kakyojin Noriaki',
    });

    await adminRepository.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);
    const admin: Admin = await adminRepository.findOne({
      where: { login: 'admin' },
    });
    if (!admin) {
      return;
    }

    await adminRepository.remove(admin);
  }
}
