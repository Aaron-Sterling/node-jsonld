// utility function that validates three files
// confirms the first two files exist
// the third filename must be a legal filename (but does not need to exist)

import { FileNameTitle } from '../../../models/filename-and-title-model';
import { fileExists } from './file-exists';
import { validateTargetFile } from './validate-target-file';
import { FILE_EXISTS } from '../file-validators/validation-constant';

export function validateSourceModifierTarget(sourceFile: FileNameTitle, modifierFile: FileNameTitle, targetFile: FileNameTitle): Promise<string> {
    const resultSource = fileExists(sourceFile);
    const resultModifier = fileExists(modifierFile);
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


