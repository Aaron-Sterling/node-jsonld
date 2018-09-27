// Validation constant

const VALIDATED = 'validated';
const OPERATION_SUCCESSFUL = 'successful';
export const FILE_EXISTS = 'file exists';

export function operationSuccessful(): string {
    return OPERATION_SUCCESSFUL.slice(0);
}

export function validated(): string {
    return VALIDATED.slice(0);
}