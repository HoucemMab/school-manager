import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
const { Readable } = require('stream');
import { Repository } from 'typeorm';
import { parse } from 'papaparse';


@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(EtudiantActuel)
        private etudiantrepository: Repository<EtudiantActuel>) { }

    create(file: Express.Multer.File) {
        const stream = Readable.from(file.buffer);
        let etudiantact = new Array<EtudiantActuel>;
        var i = 0;
        const csvData = parse(stream, {
            header: false,
            worker: true,
            dynamicTyping: true,
            delimiter: ";",
            step: function (row) {
                const etudiant = new EtudiantActuel();
                if (i > 0) {
                    var j = 0;
                    etudiant.nom = row.data[j];
                    etudiant.prenom = row.data[j + 1];
                    etudiant.dateNaissance = row.data[j + 2];
                    etudiant.formation = row.data[j + 3];
                    etudiant.poste = row.data[j + 4];
                    etudiant.visibilite = row.data[j + 5];
                    etudiant.niveau = row.data[j + 6];
                    etudiant.Classe = row.data[j + 7];
                    etudiant.anneEtudet = row.data[j + 8];
                    etudiant.login = row.data[j + 9];
                    etudiant.mdp = row.data[j + 10];



                }
                i++;

                console.log("hala madrid");
                etudiantact.push(etudiant);

            },


        });
        setTimeout(() => {
            for (var k = 0; k < etudiantact.length; k++) {
                this.etudiantrepository.save(
                    this.etudiantrepository.create(etudiantact[k])
                );

            }

        }, 1000);
    }
}
