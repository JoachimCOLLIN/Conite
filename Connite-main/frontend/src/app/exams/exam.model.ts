export class Exam
{
    constructor(
        public title: string,
        public description: string,
        public localisation: string,
        public moderateurs: string,
        public datedelancement: string,
        public id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
