// validate source file and target file
// source file must exist
// target file either must not exist, or it exists and the user confirms ok to overwrite it

import { FileNameTitle } from '../../../models/filename-and-title-model';
import { fileExists } from './file-exists';
import { validateTargetFile } from './validate-target-file';
import { FileErrorType } from '../file-error-handler/file-error-types';
import { errorMessage } from '../file-error-handler/file-error-message';
import { FILE_EXISTS } from '../file-validators/validation-constant';

export function validateSourceTarget(sourceFile: FileNameTitle, targetFile: FileNameTitle): Promise<string> {
    if (fileExists(sourceFile) === FILE_EXISTS) {
        return validateTargetFile(targetFile);
    } else {
        const errMsg = errorMessage(FileErrorType.FILE_DOES_NOT_EXIST, sourceFile.name || sourceFile.title || '');
        return Promise.resolve(errMsg);
    }                                          
}
