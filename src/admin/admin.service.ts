import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { ChangerMdpAdmin } from './dtos/changemdp.dto';
import * as argon from 'argon2';
import { AdminDto } from './dtos/admin.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) { }

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
  async updateOne(Admin: AdminDto) {
    const toUpdate: Admin = await this.adminRepository.findOneBy({
      idAdmin: Admin.idAdmin,
    });
    console.log(toUpdate);
    if (toUpdate) {
      toUpdate.nom = Admin.nom;
      toUpdate.prenom = Admin.prenom;
      toUpdate.email = Admin.email;
      toUpdate.mdp = await argon.hash(Admin.mdp);
      toUpdate.login = Admin.login;
      toUpdate.ImportExcel = Admin.ImportExcel;
      toUpdate.OperationsDemande = Admin.OperationsDemande;
      toUpdate.OperationsEns = Admin.OperationsEns;
      toUpdate.OperationsEtud = Admin.OperationsEtud;
      toUpdate.OperationsEvent = Admin.OperationsEvent;
      toUpdate.OperationsEvent = Admin.OperationsEvent;
      toUpdate.OperationsStats = Admin.OperationsStats;

      return await this.adminRepository.save(toUpdate);
    } else {
      throw new ForbiddenException('Admin not found .. !');
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
    } else {
      const isPasswordCorrect = await argon.verify(admin.mdp, changerMdpAdmin.oldmdp);
      if (!isPasswordCorrect) {
        throw new ForbiddenException('Current password is incorrect');
      } else {
        admin.mdp = await argon.hash(changerMdpAdmin.mdp);
      }
    }
    return this.adminRepository.save(admin);
  }
}
