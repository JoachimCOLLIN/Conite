export class Ouvrier
{
    constructor(
        public id_chantier: number,
        public nom: string,
        public prenom: string,
        public age: string,
        public qualification: string,
        public id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
