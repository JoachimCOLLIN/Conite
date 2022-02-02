export class PointageOuvrier
{
    constructor(
        public id_chantier: Number,
        public id_ouvrier:Number,
        public date: Date,
        public heures: number,
        public galerie: number,
        public habillement: Boolean,
        public machine: Boolean,
        public id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
