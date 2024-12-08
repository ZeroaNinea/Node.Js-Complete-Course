declare module "sequelize-mock" {
  export default class SequelizeMock {
    define(
      // `define` creates types.
      modelName: string, // The name of the model.
      defaultValues: object, // Default values.
      options?: {
        instanceMethods?: Record<string, Function>; // An object with keys as names and values as functions.
      }
    ): any;
  }
}
