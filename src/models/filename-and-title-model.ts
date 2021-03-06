// File name (path) and title


interface FileNameTitle {
    name: string;
    title: string;
    defaultName?: string;
}

function newFileNameTitle(): FileNameTitle {
    const ret: FileNameTitle = {
        name: '',
        title: '',
        defaultName: ''
    }
    return ret;
}

export { FileNameTitle, newFileNameTitle }

