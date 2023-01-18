import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Controller('participation')
export class ParticipationController {

    constructor(private participationService: ParticipationService) {}

    @Post('/add')
    async addStudentToEvent(@Body() participation:Participation) {
        return this.participationService.addParticipation(participation);
    }



}
