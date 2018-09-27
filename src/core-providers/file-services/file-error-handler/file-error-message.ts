// error message

import { FileErrorType } from './file-error-types';

export function errorMessage(error: FileErrorType, spec: string) {
    return error + ':' + spec;
}