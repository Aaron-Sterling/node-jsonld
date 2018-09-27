// validates target file
// the target file must either exist, or be created without error
// optionally, the user can pass a ConfirmOverwrite method that executes if the file exists
// the ConfirmOverwrite method must return a Promise<string>
// the target file is validated to be overwritten only if ConfirmOverwrite resolves to "VALIDATED"
// resolves true exactly when the target file is validated
// calls displayError if it is going to return false

import { FileNameTitle, newFileNameTitle } from '../../../models/filename-and-title-model';
import { errorMessage } from '../file-error-handler/file-error-message';
import { FileErrorType } from '../file-error-handler/file-error-types';
import { existsSync, open } from 'fs';
import { promisify } from 'util';
import { validated } from './validation-constant';

export type ConfirmationMethod = (fileName: string) => Promise<boolean>;

const openFile = promisify(open);
const CONFIRM_OVERWRITE_DEFAULT: ConfirmationMethod = _ => Promise.resolve(true);

export function validateTargetFile(file: FileNameTitle = newFileNameTitle(),
                                   defaultTargetFile: FileNameTitle = newFileNameTitle(),
                                   confirmOverwrite = CONFIRM_OVERWRITE_DEFAULT): Promise<string> {
                                
    let fileNameToTest: string = '';
    // attempt to find principal, then default filename
    // if neither one exists, display an error and terminate
    if (file.name) {
        fileNameToTest = file.name;
    }
    if (!fileNameToTest && (defaultTargetFile && defaultTargetFile.name)) {
        fileNameToTest = defaultTargetFile.name;
    } else if (!fileNameToTest && (!defaultTargetFile || !defaultTargetFile.name)) {
        const errMsg = errorMessage(FileErrorType.NO_FILE_SPECIFIED, file.title || defaultTargetFile.title || '')
        return Promise.resolve(errMsg);
    }
    // name has been found
    // now check whether file can be opened
    if (existsSync(fileNameToTest)) {
        return confirmOverwrite(fileNameToTest).then( conf => { if (conf) // file exists, get user confirmation if requested
                                                                  { return validated() } 
                                                                  else { return '' }
                                                             }); 
    } else {
        return openFile(fileNameToTest, 'w')  // file does not exist, return VALIDATED if opened successfully
               .then(_ => validated())
               .catch(_ => {
                              const errMsg = errorMessage(FileErrorType.CANNOT_CREATE_FILE, fileNameToTest);  // report error otherwise
                              return errMsg;
                             }
                     );
    }
    
}