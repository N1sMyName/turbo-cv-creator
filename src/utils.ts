import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {promises as fs} from "node:fs";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename).slice(0,-5)

export const getFilePath = (fileName: string): string => {
    return join(__dirname, fileName)
}

export const writeToFile = async (fileName: string, content: string) => {
    await fs.writeFile(getFilePath(fileName), content)
}

export const readFromFile = async (fileName: string) => {
    return await fs.readFile(getFilePath(fileName), {encoding: 'utf-8'})
}

export const deleteFile = async (file: string) => {
    await fs.unlink(getFilePath(file))
}

export const createPath = (title: string,resolution: string = '.pdf') => {
    const dbFolderPath = getFilePath('db');
    return join(dbFolderPath, `Nazar_Hulymhuck_${title}${resolution}`);
}

