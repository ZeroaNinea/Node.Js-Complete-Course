declare module "connect-session-sequelize" {
  import { Store } from "express-session";
  import { Sequelize, ModelCtor, Model } from "sequelize";

  interface SequelizeStoreOptions {
    db: Sequelize;
    table?: string | ModelCtor<Model>;
    extendDefaultFields?: (defaults: any, session: any) => any;
    checkExpirationInterval?: number;
    expiration?: number;
  }

  interface SequelizeStore extends Store {
    sync(): Promise<void>;
  }

  function connectSessionSequelize(store: typeof Store): {
    new (options: SequelizeStoreOptions): SequelizeStore;
  };

  export default connectSessionSequelize;
}
