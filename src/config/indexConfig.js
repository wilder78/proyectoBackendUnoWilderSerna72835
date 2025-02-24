//SOLO VALIDO EN TYPE MODULE
//Usando commonjs __dirname ya está accesible globalmente
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = join(dirname(__filename), '../../')

export const config = {
  dirname: __dirname,
  PORT: 8080,
  db: {
    // coderhouse sera la base de datos a la cual se conectará.
    connectionString: `mongodb+srv://company:M7D5W8tE8mIR72la@cluster0.gw9yn.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0`,
  },
}

console.log(config.dirname)
