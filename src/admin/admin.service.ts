import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { ChangerMdpAdmin } from './dtos/changemdp.dto';
import * as argon from 'argon2';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) {}
    
    async addAdmin(admin: Admin): Promise<Admin> {
    return this.adminRepository.save(admin);
    }

    async getAll(): Promise<Admin[]> {
        return this.adminRepository.find();
    }

    async getAdminById(id: string): Promise<Admin> {
        const admin: Admin = await this.adminRepository.findOneBy(
          {
            idAdmin: id,
          },
        );
        if (!admin) {
          throw new ForbiddenException('Admin Not Found');
        } else {
          return admin;
        }
    }

    async deleteAdminById(id: string): Promise<DeleteResult> {
        const admin: Admin = await this.getAdminById(id);
        if (!admin) {
          throw new Error('Cannot Find Admin');
        } else {
          return await this.adminRepository.delete({ idAdmin: id });
        }
    }

    async changerMdpAdmin(
        changerMdpAdmin: ChangerMdpAdmin,
      ): Promise<Admin> {
        const admin: Admin = await this.getAdminById(
          changerMdpAdmin.id,
        );
        if (!admin) {
          throw new ForbiddenException('Admin Not Found');
        }else {
          const isPasswordCorrect = await argon.verify(admin.mdp, changerMdpAdmin.oldmdp);
          if (!isPasswordCorrect) {
          throw new ForbiddenException('Current password is incorrect');
          } else{
          admin.mdp = await argon.hash(changerMdpAdmin.mdp);
          }  
        }
        return this.adminRepository.save(admin);
      }
}
