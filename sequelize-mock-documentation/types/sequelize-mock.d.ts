declare module "sequelize-mock" {
  export default class SequelizeMock {
    $overrideImport(model: string, mockModel: string): void; // Add the `$overrideImport` method to the datatypes.
    define(
      // Add `define` method to the types.
      modelName: string, // The name of the model.
      defaultValues: object, // Default values.
      options?: {
        instanceMethods?: Record<string, Function>; // An object with keys as names and values as functions.
      }
    ): {
      create: Function; // Mocked `create` method.
      findAll: Function; // Mocked `findAll` method.
      [key: string]: any; // Allow for additional properties.
    };
  }
}
