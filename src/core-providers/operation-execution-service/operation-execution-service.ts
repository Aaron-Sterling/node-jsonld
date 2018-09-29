// the service that executes the JSON-LD operation


import { inject, injectable } from 'inversify';
import { JsonLdObject } from 'jsonld';
import { ReadWriteFileService } from '../file-services/read-write-file-service';
import { JsonLdModifierOperation, JsonLdOperation } from '../../models/json-ld-operation';
import { TYPES } from '../../inversify/types';
import { OperationOptions } from './option-types';

@injectable()
export class OperationExecutionService {

    startingJson: JsonLdObject = {};
    modifierToUse: JsonLdObject = {};
    targetFile = '';
    options: OperationOptions = {};

    constructor(@inject(TYPES.ReadWriteFileService) private fileService: ReadWriteFileService) {}

    // accepts 4 parameters
    // source file, modifier file, operation, target file
    // it reads from the source and modifier files
    // then it performs the operation on those two sets of data
    // finally, it stores the result of the operation in the target file
    //
    // resolves to a string that either reports success or an error
    // displays an error if it encounters a condition that will cause it to resolve to false
    sourceModifierOperation<T>(source: string, modifier: string, target: string, operation: JsonLdModifierOperation<T>, options: OperationOptions): Promise<string> {

        this.startingJson = {};
        this.modifierToUse = {};
        this.targetFile = target;
        this.options = options;
        
        // source file read, and main return statement
        return this.fileService.readJsonLdFile(source)
                  .then(res => {
                                if (!res) { return 'Read Error: Source File: JSON-LD object empty' }
                                else      { 
                                           this.startingJson = res;
                                           return this.readModifierFile(modifier, operation);
                                          }
                               })
                        .catch(err => err);   
    }

    sourceOpTarget<T>(source: string, target: string, operation: JsonLdOperation<T>, options: OperationOptions): Promise<string> {

        this.startingJson = {};
        this.modifierToUse = {};
        this.targetFile = target;
        this.options = options;
       
        return this.fileService.readJsonLdFile(source)
                  .then(res => {
                                if (!res) { return 'Read Error: Source File: JSON-LD object empty' }
                                else      { 
                                           this.startingJson = res;
                                           return this.performOperation(operation);
                                          }
                               });
    }

    // private helper methods

    // modifier file read
    private readModifierFile<T>(modifier: string, operation: JsonLdModifierOperation<T>): Promise<string> {
        return this.fileService.readJsonLdFile(modifier)
                    .then(res => {
                                  if (!res) { return 'Read Error: Modifier File: JSON-LD object empty' }
                                  else { 
                                        this.modifierToUse = res;
                                        return this.performOperation<T>(operation);
                                       }
                         })
                    .catch(err => err);
    }

    // now perform the main JSON-LD operation
    // note: we need to wrap the es6-promise (OldPromise) in a TS promise for the compiler to be happy
    private performOperation<T>(operation: JsonLdModifierOperation<T>): Promise<string> {  
        return operation(this.startingJson, this.modifierToUse, this.options)
                        .then(res => {
                                    const afterOperationApplied: T = res;
                                    return this.writeTargetFile(afterOperationApplied);
                                    })
                        .catch(err => err); 
    }

    // target file write
    private writeTargetFile<T>(afterOperationApplied: T): Promise<string> {
        return this.fileService.writeJsonLdFile(this.targetFile, afterOperationApplied)
                 .then(res => res)
                 .catch(err => err);
    }
}



