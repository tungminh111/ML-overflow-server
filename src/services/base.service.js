class BaseService {
    constructor(name, model) {
        this.model = model;
    }

    async create(data) {
        console.log("CREATE DATA", this.name, JSON.stringify(data));
        const record = this.model.build(data);
        return await record.save();
    }

    async findOne(...params) {
        return await this.model.findOne(...params);
    }

    async findAll(...params) {
        return await this.model.findAll(...params); 
    }

    async update(...params) {
        return await this.model.update(...params);
    }

    async destroy(...params) {
        return await this.model.destroy(...params);
    }
}

module.exports = BaseService;