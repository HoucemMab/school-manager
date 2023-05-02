import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EtudiantActuelService } from 'src/etudiant-actuel/etudiant-actuel.service';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { Etudiant } from 'src/etudiant/etudiant.entity';
import { MongoRepository, Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3005'],
  },
})
export class NotificationServiceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}
  afterInit(server: any) {
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
  }
  @WebSocketServer()
  server: Server;
  async postNotif(notif: NotificationEntity): Promise<NotificationEntity> {
    return this.notificationRepository.save(notif);
  }
  async getNotifsByUserId(id: any): Promise<NotificationEntity[]> {
    const listenotif: NotificationEntity[] =
      await this.notificationRepository.find();
    const userId = id.id;
    const listenotifFiltered: NotificationEntity[] = listenotif.filter(
      (n) => n.idUser == userId,
    );
    return listenotifFiltered;
  }
  async sendNotification(idEtudiant: string, data: any) {
    this.server.emit(idEtudiant, data);
  }

  async sendJobNotification(idEtudiant: string, data: any) {
    this.server.emit(idEtudiant, data);
  }
  async sendDiplomaNotification(idEtudiant: string, data: any) {
    console.log(idEtudiant);
    this.server.emit(idEtudiant, data);
  }
}
