// Options defaults

import { CompactOptions, FromRdfOptions, ExpandOptions, FlattenOptions, FrameOptions,
         NormalizeOptions, ToRdfOptions } from 'jsonld';

export const DEFAULT_COMPACT_OPTIONS: CompactOptions = {};
export const DEFAULT_DESERIALIZE_OPTIONS: FromRdfOptions = {format: 'application/n-quads'};
export const DEFAULT_EXPAND_OPTIONS: ExpandOptions = {};
export const DEFAULT_FLATTEN_OPTIONS: FlattenOptions = {};
export const DEFAULT_FRAME_OPTIONS: FrameOptions = {};
export const DEFAULT_NORMALIZE_OPTIONS: NormalizeOptions = {format: 'application/n-quads'};
export const DEFAULT_SERIALIZE_OPTIONS: ToRdfOptions = {format: 'application/n-quads'};