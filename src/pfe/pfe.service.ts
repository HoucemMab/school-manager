import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdatePfeDto } from './pfe.dto';
import { Pfe } from './pfe.entity';
import { v4 as uuidv4 } from 'uuid';
import { Console } from 'console';

@Injectable()
export class PfeService {
  constructor(@InjectRepository(Pfe) private pfeRepository: Repository<Pfe>) {}

  async addPfe(pfe: Pfe): Promise<Pfe> {
    const pfetoAdd = await this.pfeRepository.save(pfe);
    pfetoAdd.idpfe = uuidv4();

    return await this.pfeRepository.save(pfetoAdd);
  }
  async findAllPfe(): Promise<Pfe[]> {
    return await this.pfeRepository.find();
  }
  async findPfeByEnseignant(id: string): Promise<Pfe[]> {
    const pfe: Pfe[] = await this.pfeRepository.findBy({
      idEnseignant: id,
    });
    if (!pfe) {
      throw new NotFoundException('Pfe not found');
    } else {
      return pfe;
    }
  }

  async findPfeById(id: string): Promise<Pfe> {
    const pfe = await this.pfeRepository.findOneBy({ idpfe: id });
    if (!pfe) {
      console.log('notfound');
      throw new NotFoundException('Not found');
    } else {
      return pfe;
    }
  }
  async deletePfeById(id: string): Promise<DeleteResult> {
    const pfe: Pfe = await this.findPfeById(id);
    if (pfe) {
      return this.pfeRepository.delete({ idpfe: id });
    } else {
      throw new ForbiddenException('Error happened');
    }
  }
  async updatePfeById(updatePfeDto: UpdatePfeDto) {
    console.log(updatePfeDto);

    const toUpdate: Pfe = await this.findPfeById(updatePfeDto.idpfe);
    console.log('from update', toUpdate);
    if (toUpdate) {
      return await this.pfeRepository.save(updatePfeDto);
    } else {
      throw new NotFoundException('Pfe not found .. !');
    }
  }
  async beEncadrant(id: string, idEnseignant: string) {
    console.log('pfeId', id, 'idEnseignant', idEnseignant);
    const pfe = await this.findPfeById(id);
    pfe.idEnseignant = idEnseignant;

    return await this.pfeRepository.save(pfe);
  }
  async stats(): Promise<any> {
    const all = await this.findAllPfe();
    const pays: any = [];
    const societe: any = [];
    const type: any = [];

    var counting = 0;

    const all_pfe = (await all).reduce(
      (all_pfe: { [key: string]: any }, item) => {
        const pfe = all_pfe[item.pays] || [];
        pfe.push(item);
        all_pfe[item.pays] = pfe;
        return all_pfe;
      },
      {},
    );
    Object.keys(all_pfe).map((pfe) => {
      counting = 0;
      const value = all_pfe[pfe];
      value.map((d: any) => {
        if (d.pays === pfe) {
          counting++;
        }
      }),
        pays.push({
          pays: pfe,
          count: counting,
        });
    });
    const par_societe = (await all).reduce(
      (all_pfe: { [key: string]: any }, item) => {
        const pfe = all_pfe[item.societe] || [];
        pfe.push(item);
        all_pfe[item.societe] = pfe;
        return all_pfe;
      },
      {},
    );
    Object.keys(par_societe).map((pfe) => {
      counting = 0;
      const value = par_societe[pfe];
      value.map((d: any) => {
        if (d.societe === pfe) {
          counting++;
        }
      }),
        societe.push({
          societe: pfe,
          count: counting,
        });
    });
    const par_type = (await all).reduce(
      (all_pfe: { [key: string]: any }, item) => {
        const pfe = all_pfe[item.type] || [];
        pfe.push(item);
        all_pfe[item.type] = pfe;
        return all_pfe;
      },
      {},
    );
    Object.keys(par_type).map((pfe) => {
      counting = 0;
      const value = par_type[pfe];
      value.map((d: any) => {
        if (d.type === pfe) {
          counting++;
        }
      }),
        type.push({
          type: pfe,
          count: counting,
        });
    });
    const table = [...pays, ...societe, ...type];
    console.log(table);
    return table;
  }
}
