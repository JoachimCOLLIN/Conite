export class PointageOuvrier
{
    constructor(
        public id_chantier: number,
        public id_ouvrier:number,
        public date: Date,
        public heures: number,
        public galerie_heures: number,
        public prime_habillement: Boolean,
        public prime_machine: Boolean,
        public id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
