// file validation service

import { injectable } from 'inversify';
//
import { existsSync } from 'fs';
import { newFileNameTitle, FileNameTitle } from '.././../../models/filename-and-title-model';
import { errorMessage } from '../file-error-handler/file-error-message';
import { FileErrorType } from '../file-error-handler/file-error-types';
import { FILE_EXISTS } from '../file-validators/validation-constant';
import { validateTargetFile } from './validate-target-file';

@injectable()
export class FileValidationService {

    // public methods

    validateSourceModifierTarget(sourceFile: FileNameTitle, modifierFile: FileNameTitle, targetFile: FileNameTitle): Promise<string> {
        const resultSource = this.fileExists(sourceFile);
        const resultModifier = this.fileExists(modifierFile);
        if (resultSource===FILE_EXISTS && resultModifier===FILE_EXISTS) {
            return validateTargetFile(targetFile);
        } else {
            if (resultSource !== FILE_EXISTS) {
                return Promise.resolve(resultSource);
            } else {
                return Promise.resolve(resultModifier);
            }
        }                                          
    }

    validateSourceTarget(sourceFile: FileNameTitle, targetFile: FileNameTitle): Promise<string> {
        if (this.fileExists(sourceFile) === FILE_EXISTS) {
            return validateTargetFile(targetFile);
        } else {
            const errMsg = errorMessage(FileErrorType.FILE_DOES_NOT_EXIST, sourceFile.name || sourceFile.title || '');
            return Promise.resolve(errMsg);
        }                                          
    }

    // private helper method

    private fileExists(file = newFileNameTitle()): string {
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
    
}