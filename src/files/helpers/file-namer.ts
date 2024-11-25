import { v4 as uuid } from "uuid"
import { extname } from "path"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if ( !file ) return callback( new Error(`File is empty`), false)

    const ext = extname(file.originalname)
    const fileName = `${file.fieldname}-${uuid()}${ext}`

    callback(null, fileName)
}