export class Env {
    static getEnvironmentVariable(variable: string): string {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return process.env[variable]!;
    }
}    