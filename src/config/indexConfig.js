//SOLO VALIDO EN TYPE MODULE
//Usando commonjs __dirname ya está accesible globalmente
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = join(dirname(__filename), '../../')

const USERMONGODB = process.env.USERMONGODB
const PASSWORDMONGODB = process.env.PASSWORDMONGODB

export const config = {
  dirname: __dirname,
  PORT: 8080,
  db: {
    // coderhouse sera la base de datos a la cual se conectará.
    connectionString: `mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.gw9yn.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0`,
  },
}
