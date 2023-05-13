export class AdminDto {

    idAdmin: string;
    nom: string;
    prenom: string;
    login: number;
    mdp: string;
    email: string;
    OperationsEtud: boolean = true;
    ImportExcel: boolean = true;
    OperationsEvent: boolean = true;
    OperationsEns: boolean = true;
    OperationsStats: boolean = true;
    OperationsDemande: boolean = true;
}