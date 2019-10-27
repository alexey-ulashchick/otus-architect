import { Pool, createPool } from  "mysql";
import { Page } from "../models/Page";

let instance: DataSource|null = null;

export class DataSource {

  private readonly connection: Pool;

  private constructor()  {
    this.connection = createPool({
      host: 'localhost',
      user: 'root',
      password: 'dockerinternal',
      database: 'otus_dev',
    });
  }

  public getPages(query: string): Promise<Page[]> {
    return new Promise((resolve, rejects) => {
      this.connection.query(
        `(select email, firstName, lastName, city from pages where firstName like "${query}%" limit 1000)
            union
         (select email, firstName, lastName, city from pages where lastName like "${query}%" limit 1000) order by email limit 1000`,
         (error, results)=> {
            if (error) {
              return rejects(error);
            }

            return resolve(results);
         });
    })

  }

  public static getInstance(): DataSource {
    if (instance !== null) {
      return instance;
    }

    instance = new DataSource();

    return instance;
  }

}