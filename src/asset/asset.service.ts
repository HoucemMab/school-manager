import { ForbiddenException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const { Readable } = require('stream');
import { Repository } from 'typeorm';
import { parse } from 'papaparse';
import { EtudiantActuel } from 'src/etudiant-actuel/etudiantActuel.entity';
import { BaseExceptionFilter } from '@nestjs/core';
import * as argon from 'argon2';



@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(EtudiantActuel)
        private etudiantrepository: Repository<EtudiantActuel>) { }

    async create(file: Express.Multer.File) {
        const stream = Readable.from(file.buffer);
        let etudiantact = new Array<any>;
        var liste = new Array<any>;
        var i = 0;
        const csvData = parse(stream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                //console.log('results:', results)
                console.log("fields", results.meta.fields)
                const areEqual = JSON.stringify(results.meta.fields) === JSON.stringify([
                    'nom', 'prenom',
                    'dateNaissance', 'formation',
                    'poste', 'visibilite',
                    'niveau', 'Classe',
                    'anneeEdut', 'login',
                    'mdp', 'EtudiantActId', "email"
                ]);
                if (!areEqual) {
                    throw new HttpException("please verify your fields of the file", HttpStatus.BAD_REQUEST)

                }
                else {
                    etudiantact = results.data;
                    for (let k = 0; k < etudiantact.length; k++) {
                        etudiantact[k].login = parseInt(etudiantact[k].login);
                        //etudiantact[k].anneEtudet=etudiantact[k].anneEtudet;
                        let etudiant = new EtudiantActuel();

                        const element = etudiantact[k];

                        //console.log("student", element);
                        element.pfa = null;
                        element.cv = null;
                        element.pfe = null;
                        element.stages = null;
                        element.visibilite = Boolean(etudiantact[k].visibilite);
                        element.login = element.login;
                        element.Reussi = 0;
                        const hash = await argon.hash(element.mdp);
                        element.mdp = hash;
                        etudiant = element;
                        const test = await this.etudiantrepository.findOneBy({
                            login: etudiant.login
                        });
                        if (test != null) {
                            console.log(test.login);

                            console.log("Already existing");

                        } else {
                            liste.push(etudiant);
                            this.etudiantrepository.save(etudiant);
                        }




                    }
                    return {
                        success: "studends added successfuly",
                        liste: liste,
                    };



                }
            }



            /*step: function (row) {
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
                    etudiant.email = row.data[j + 11]
                    etudiant.EtudiantActId = row.data[j + 12].toString();
                    etudiant.pfa = null;
                    etudiant.pfe = null;
                    etudiant.stages = [];
                    etudiant.cv = null;
 
 
 
                }
                i++;
 
                console.log("hala madrid");
                etudiantact.push(etudiant);
 
            },*/


        });
        /* for(var k = 0; k < etudiantact.length; k++){
             const test = this.etudiantrepository.findOneBy({
                 EtudiantActId: etudiantact[k].EtudiantActId
             })
             if (test) {
                 (await test).dateNaissance = etudiantact[k].dateNaissance;
                 (await test).nom = etudiantact[k].nom;
                 (await test).prenom = etudiantact[k].prenom;
                 (await test).login = etudiantact[k].login;
                 (await test).Classe = etudiantact[k].Classe;
                 (await test).stages = etudiantact[k].stages;
                 (await test).formation = etudiantact[k].formation;
                 (await test).email = etudiantact[k].email;
                 (await test).mdp = etudiantact[k].mdp;
                 (await test).poste = etudiantact[k].poste;
                 (await test).niveau = etudiantact[k].niveau;
                 (await test).visibilite = etudiantact[k].visibilite;
                 (await test).anneEtudet = etudiantact[k].anneEtudet;
                 this.etudiantrepository.save(await(test));
 
             } else {
                 this.etudiantrepository.save(
                     this.etudiantrepository.create(etudiantact[k])
                 );
             }
 
         }*/

        /*
        setTimeout(async () => {
            for (var k = 0; k < etudiantact.length; k++) {
                const test = await this.etudiantrepository.findOneBy({
                    EtudiantActId: etudiantact[k].EtudiantActId
                })
                if (test) {
                    test.dateNaissance = etudiantact[k].dateNaissance;
                    test.nom = etudiantact[k].nom;
                    test.prenom = etudiantact[k].prenom;
                    test.login = etudiantact[k].login;
                    test.Classe = etudiantact[k].Classe;
                    test.stages = etudiantact[k].stages;
                    test.formation = etudiantact[k].formation;
                    test.email = etudiantact[k].email;
                    test.mdp = etudiantact[k].mdp;
                    test.poste = etudiantact[k].poste;
                    test.niveau = etudiantact[k].niveau;
                    test.visibilite = etudiantact[k].visibilite;
                    test.anneEtudet = etudiantact[k].anneEtudet;
                    this.etudiantrepository.save(test);

                } else {
                    this.etudiantrepository.save(
                        this.etudiantrepository.create(etudiantact[k])
                    );
                }

            }

        }, 1000);*/
    }
}
