declare module "sequelize-mock" {
  export default class SequelizeMock {
    define(
      modelName: string,
      defaultValues: object,
      options?: {
        instanceMethods?: Record<string, Function>;
      }
    ): any;
  }
}
