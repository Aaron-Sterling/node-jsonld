// Clean up point for parameters for JSON-LD operation calls
// Also includes help message getters

import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';
//
import { OperationService } from './operations/operationService';
//
import { defaultTargetFile } from './defaults/default-target-file';
//
import * as defaultOptions from './defaults/options-defaults';
//
import { HelpMessageTypes } from './core-providers/help-message-service/help-message-types';
import { helpMessage } from './core-providers/help-message-service/help-message-service';

@injectable()
export class NodeJSONLD {

    constructor(@inject(TYPES.OperationService) private operation: OperationService) {}

    // JSON-LD Operations

    // compact operation
    compact(sourceFile: string, contextFile: string,  targetFile = defaultTargetFile(), 
                                options = defaultOptions.DEFAULT_COMPACT_OPTIONS): Promise<string> {

        return this.operation.compact(sourceFile, contextFile, targetFile, options);
    }

    // deserialize (fromRDF) operation
    deserialize(sourceFile: string, targetFile = defaultTargetFile(),
                                    options = defaultOptions.DEFAULT_DESERIALIZE_OPTIONS): Promise<string> {

        return this.operation.deserialize(sourceFile, targetFile, options);
    }

    // expand operation
    expand(sourceFile: string, targetFile = defaultTargetFile(), 
                               options = defaultOptions.DEFAULT_EXPAND_OPTIONS): Promise<string> {

        return this.operation.expand(sourceFile, targetFile, options);
    }

    // flatten operation
    flatten(sourceFile: string, targetFile = defaultTargetFile(), options = defaultOptions.DEFAULT_FLATTEN_OPTIONS): Promise<string> {

        return this.operation.flatten(sourceFile, targetFile, options);
    }

    // frame operation
    frame(sourceFile: string, frameFile: string, targetFile = defaultTargetFile(),
                              options = defaultOptions.DEFAULT_FRAME_OPTIONS): Promise<string> {

        return this.operation.frame(sourceFile, frameFile, targetFile, options);
    }

    // normalize operation
    normalize(sourceFile: string, targetFile = defaultTargetFile(),
                                  options = defaultOptions.DEFAULT_NORMALIZE_OPTIONS): Promise<string> {

        return this.operation.normalize(sourceFile, targetFile, options);
    }

    // serialize operation
    serialize(sourceFile: string, targetFile: string = defaultTargetFile(),
                                  options = defaultOptions.DEFAULT_SERIALIZE_OPTIONS): Promise<string> {

        return this.operation.serialize(sourceFile, targetFile, options);
    }

    // help message getters

    getCompactHelpMessage(): string {
        return helpMessage(HelpMessageTypes.COMPACT);
    }

    getDeserializeHelpMessage(): string {
        return helpMessage(HelpMessageTypes.DESERIALIZE);
    }

    getExpandHelpMessage(): string {
        return helpMessage(HelpMessageTypes.EXPAND);
    }

    getFlattenHelpMessage(): string {
        return helpMessage(HelpMessageTypes.FLATTEN);
    }

    getFrameHelpMessage(): string {
        return helpMessage(HelpMessageTypes.FRAME);
    }

    getNormalizeHelpMessage(): string {
        return helpMessage(HelpMessageTypes.NORMALIZE);
    }

    getSerializeHelpMessage(): string {
        return helpMessage(HelpMessageTypes.SERIALIZE);
    }
}