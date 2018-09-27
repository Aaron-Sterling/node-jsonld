// Loads JSON from a source, performs an operation on it, then stores the result in a target file

import { JsonLdObject } from 'jsonld';
import { readJsonLdFile, writeJsonLdFile } from '../../core-providers/file-services/read-write-file';
import { JsonLdOperation } from '../../models/json-ld-operation';


export function sourceOpTarget<T>(source: string, target: string, operation: JsonLdOperation<T>, options: any): Promise<string> {
    
    let startingJson: JsonLdObject;
    let afterOperationApplied: T;
    
    return readJsonLdFile(source)
              .then(res => {
                            if (!res) { return 'Read Error: Source File: JSON-LD object empty' }
                            else      { 
                                       startingJson = res;
                                       return performOperation();
                                      }
                           });

    function performOperation(): Promise<string> {  
        return operation(startingJson, options)
                        .then(res => {
                                      afterOperationApplied = res;
                                      return writeTargetFile();
                                     })
                        .catch(err => err); 
    }

    // target file write
    function writeTargetFile(): Promise<string> {
        return writeJsonLdFile<T>(target, afterOperationApplied)
                 .then(res => res)
                 .catch(err => err);
    }
}