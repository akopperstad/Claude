// Minimal ambient types for the built-in node:sqlite (experimental, no @types yet).
declare module "node:sqlite" {
  interface Statement {
    run(...params: any[]): { changes: number; lastInsertRowid: number | bigint };
    get(...params: any[]): any;
    all(...params: any[]): any[];
  }
  export class DatabaseSync {
    constructor(path: string, options?: { readOnly?: boolean });
    exec(sql: string): void;
    prepare(sql: string): Statement;
    close(): void;
  }
}
