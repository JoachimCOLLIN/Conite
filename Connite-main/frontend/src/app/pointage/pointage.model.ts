export class PointageOuvrier
{
    constructor(
        public id_chantier: Number,
        public id_ouvrier:Number,
        public date: Date,
        public heures: Number,
        public galerie: Number,
        public habillement: Boolean,
        public machine: Boolean,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
