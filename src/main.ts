// Main export source for JSON-LD operation calls and help message getters

import { defaultTargetFile } from './commands/utils/default-target-file';
import { compactAction } from './commands/compact/compact-action';
import { deserializeAction } from './commands/deserialize/deserialize-action';
import { expandAction } from './commands/expand/expand-action';
import { flattenAction } from './commands/flatten/flatten-action';
import { frameAction } from './commands/frame/frame-action';
import { normalizeAction } from './commands/normalize/normalize-action';
import { serializeAction } from './commands/serialize/serialize-action';
import * as defaultOptions from './options-defaults';
//
import { HelpMessageTypes } from './core-providers/help-message-service/help-message-types';
import { helpMessage } from './core-providers/help-message-service/help-message-service';

// JSON-LD Operations

// compact operation
export function compact(sourceFile: string, contextFile: string, 
                        targetFile = defaultTargetFile(), 
                        options = defaultOptions.DEFAULT_COMPACT_OPTIONS): Promise<string> {

    return compactAction(sourceFile, contextFile, targetFile, options);
}

// deserialize (fromRDF) operation
export function deserialize(sourceFile: string, targetFile = defaultTargetFile(),
                            options = defaultOptions.DEFAULT_DESERIALIZE_OPTIONS): Promise<string> {

    return deserializeAction(sourceFile, targetFile, options);
}

// expand operation
export function expand(sourceFile: string, targetFile = defaultTargetFile(), 
                       options = defaultOptions.DEFAULT_EXPAND_OPTIONS): Promise<string> {
    
    return expandAction(sourceFile, targetFile, options);
}

// flatten operation
export function flatten(sourceFile: string, targetFile = defaultTargetFile(),
                        options = defaultOptions.DEFAULT_FLATTEN_OPTIONS): Promise<string> {

    return flattenAction(sourceFile, targetFile, options);
}

// frame operation
export function frame(sourceFile: string, frameFile: string, targetFile = defaultTargetFile(),
                      options = defaultOptions.DEFAULT_FRAME_OPTIONS): Promise<string> {

    return frameAction(sourceFile, frameFile, targetFile, options);
}

// normalize operation
export function normalize(sourceFile: string, targetFile = defaultTargetFile(),
                          options = defaultOptions.DEFAULT_NORMALIZE_OPTIONS): Promise<string> {
    
    return normalizeAction(sourceFile, targetFile, options);
}

// serialize operation
export function serialize(sourceFile: string, targetFile: string = defaultTargetFile(),
                          options = defaultOptions.DEFAULT_SERIALIZE_OPTIONS): Promise<string> {

    return serializeAction(sourceFile, targetFile, options);
}

// help message getters

export function getCompactHelpMessage(): string {
    return helpMessage(HelpMessageTypes.COMPACT);
}

export function getDeserializeHelpMessage(): string {
    return helpMessage(HelpMessageTypes.DESERIALIZE);
}

export function getExpandHelpMessage(): string {
    return helpMessage(HelpMessageTypes.EXPAND);
}

export function getFlattenHelpMessage(): string {
    return helpMessage(HelpMessageTypes.FLATTEN);
}

export function getFrameHelpMessage(): string {
    return helpMessage(HelpMessageTypes.FRAME);
}

export function getNormalizeHelpMessage(): string {
    return helpMessage(HelpMessageTypes.NORMALIZE);
}

export function getSerializeHelpMessage(): string {
    return helpMessage(HelpMessageTypes.SERIALIZE);
}