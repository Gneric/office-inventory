
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error(`File is empty`), false)

    const fileExtension = file.mimetype.split('/')[1]
    const validExtension = ['jpg','jpeg','png','webmp']

    if ( !validExtension.includes( fileExtension ) ) {
        callback(null, false)    
    }

    callback(null, true)

}