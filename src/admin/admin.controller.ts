import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { ChangerMdpAdmin } from './dtos/changemdp.dto';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) {}
    
    @Get()
    async getAllAdmin(): Promise<Admin[]> {
        return this.adminService.getAll();
    }

    @Get('/:id')
    async getAdminById(@Param() params): Promise<Admin> {
        console.log(params);
        return this.adminService.getAdminById(params.id);
    }
    @Post()
    async addNewAdmin(@Body() admin: Admin): Promise<Admin> {
        return this.adminService.addAdmin(admin);
    }

    @Put()
    async changerMdpAdmin(
        @Body() changerMdpAdmin: ChangerMdpAdmin,
    ): Promise<Admin> {
        return this.adminService.changerMdpAdmin(changerMdpAdmin);
    }
    @Delete('/:id')
    async deleteAdminById(@Param() params): Promise<DeleteResult> {
        return this.adminService.deleteAdminById(params.id);
    }
}
