// returns FILE_EXISTS when a file exists
// returns an error message if the file does not exist

import { FileNameTitle, newFileNameTitle } from '.././../../models/filename-and-title-model';
import { existsSync } from 'fs';
import { errorMessage } from '../file-error-handler/file-error-message';
import { FileErrorType } from '../file-error-handler/file-error-types';
import { FILE_EXISTS } from '../file-validators/validation-constant';

export function fileExists(file: FileNameTitle = newFileNameTitle()): string {
    if (file.name && existsSync(file.name)) {
        return FILE_EXISTS;
    } else if (!file.name) {
        const errMsg = errorMessage(FileErrorType.NO_FILE_SPECIFIED, '');
        return errMsg;
    } else {
        const errMsg = errorMessage(FileErrorType.FILE_DOES_NOT_EXIST, file.title || '');
        return errMsg;
    }
}