export class Service {
  constructor() {}

  protected async checkUnique(model: any, onCheck: any): Promise<boolean> {
    let check = await model.findAll({
      where: onCheck,
    })
    console.log(check)

    return false
  }
}
