export interface IPgError extends Error {
    table: string;
    constraint: string;
    schema: string;
    code: string;
    detail: string;
    column: string;
}
