import {useCallback} from "react";
import {FileItemComponent} from "./FileItemComponent";
import {FileProps} from "../../../models/MediaFile";

interface Props {
    files: FileProps[];
    setFiles: (value: FileProps[]) => void;
    setFileToRemove: (id: string) => void;
}

export const FilesTable = ({ files, setFiles, setFileToRemove }: Props) => {

    const removeElement = (index: number) => {
        const newFiles = [...files];
        const fileToRemove = files[index];
        newFiles.splice(index, 1);
        setFiles([...newFiles]);
        setFileToRemove(fileToRemove.id);
    }

    const moveFile = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const newFiles = [...files];
            const b = newFiles[hoverIndex];
            newFiles[hoverIndex] = newFiles[dragIndex];
            newFiles[dragIndex] = b;
            setFiles([...newFiles]);
        },
        [files],
    )

    const changeToPrincipal = (file: FileProps) => {
        files.forEach(f => {
            f.principal = false;
        });
        file.principal = true;
        setFiles([...files]);
    }

    return (
        <div
            style={{
                width: "100%",
                margin: "20px 0"
            }}
        >

            {files.map((file: FileProps, index: number) => (
                <FileItemComponent
                    file={file}
                    index={index}
                    deleteFile={removeElement}
                    key={files[index].id}
                    moveFile={moveFile}
                    changeToPrincipal={() => changeToPrincipal(file)}
                />
            ))}
        </div>
    )
}
