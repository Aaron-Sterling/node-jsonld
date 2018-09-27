// a helper function
// accepts 4 parameters
// source file, modifier file, operation, target file
// it reads from the source and modifier files
// then it performs the operation on those two sets of data
// finally, it stores the result of the operation in the target file
//
// resolves to a string that either reports success or an error
// displays an error if it encounters a condition that will cause it to resolve to false

import { JsonLdObject } from 'jsonld';
import { readJsonLdFile, writeJsonLdFile } from '../../core-providers/file-services/read-write-file';
import { JsonLdModifierOperation } from '../../models/json-ld-operation';


export function sourceModifierOperation<T>(source: string, modifier: string, target: string, operation: JsonLdModifierOperation<T>, options: any): Promise<string> {

    let startingJson: JsonLdObject;
    let modifierToUse: JsonLdObject;
    let afterOperationApplied: T;
    
    // source file read, and main return statement
    return readJsonLdFile(source)
              .then(res => {
                            if (!res) { return 'Read Error: Source File: JSON-LD object empty' }
                            else      { 
                                       startingJson = res;
                                       return readModifierFile();
                                      }
                           })
                    .catch(err => err);

    // modifier file read
    function readModifierFile(): Promise<string> {
        return readJsonLdFile(modifier)
                    .then(res => {
                                  if (!res) { return 'Read Error: Modifier File: JSON-LD object empty' }
                                  else { 
                                        modifierToUse = res;
                                        return performOperation();
                                       }
                         })
                    .catch(err => err);
    }

    // now perform the main JSON-LD operation
    // note: we need to wrap the es6-promise (OldPromise) in a TS promise for the compiler to be happy
    function performOperation(): Promise<string> {  
        return operation(startingJson, modifierToUse, options)
                      .then(res => {
                                    afterOperationApplied = res;
                                    return writeTargetFile();
                                   })
                      .catch(err => err); 
    }

    // target file write
    function writeTargetFile(): Promise<string> {
        return writeJsonLdFile(target, afterOperationApplied)
                 .then(res => res)
                 .catch(err => err);
    }
}

