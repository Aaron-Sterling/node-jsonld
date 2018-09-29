// Read/Write File Service

import { injectable } from 'inversify';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';
import { errorMessage } from "./file-error-handler/file-error-message";
import { FileErrorType } from "./file-error-handler/file-error-types";
import { JsonLdObject } from 'jsonld';
import { operationSuccessful } from './file-validators/validation-constant';

// read from or write to a file

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

@injectable()
export class ReadWriteFileService {

    readJsonLdFile(fileName: string): Promise<JsonLdObject> {
        return readFilePromise(fileName)
                       .then(buf => <JsonLdObject> JSON.parse(buf.toString()))
                       .catch(_ => {
                                    const errMsg = errorMessage(FileErrorType.CANNOT_READ_FROM_FILE, fileName);
                                    throw errMsg;
                       });
    }

    // write to a file
    // resolves to true if the write went well
    // resolves to false otherwise
    // calls displayError if resolving to false

    writeJsonLdFile<T>(fileName: string, data: T): Promise<string> {
        return writeFilePromise(fileName, JSON.stringify(data))
                    .then(_ => operationSuccessful())
                    .catch(_ => {
                                    const errMsg = errorMessage(FileErrorType.CANNOT_WRITE_TO_FILE, fileName);
                                    return errMsg;
                    });
    }

}



