// types for inversify

export const enum TYPES {
    NodeJSONLD = 'NodeJSONLD',
    //
    OperationService = 'Operation Service',
    OperationExecutionService = 'Operation Execution Service',
    FileValidationService = 'File Validation Service',
    ReadWriteFileService = 'Read/Write File Service',
    //
    CompactOperation = 'Compact Operation',
    DeserializeOperation = 'Deserialize Operation',
    ExpandOperation = 'Expand Operation',
    FlattenOperation = 'Flatten Operation',
    FrameOperation = 'Frame Operation',
    NormalizeOperation = 'Normalize Operation',
    SerializeOperation = 'Serialize Operation'
};