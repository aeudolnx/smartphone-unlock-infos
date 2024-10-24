import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import sqlite3 from 'sqlite3'
const dbPath = path.join(app.getPath('userData'), 'database.db')
process.env.DATABASE_URL = `file:${dbPath}`
const prisma = new PrismaClient()
const exp = express()
exp.use(express.json())
exp.use(cors())
const PORT = 3000
const storage = multer.memoryStorage() // Armazena o arquivo na memória
const upload = multer({ storage: storage })
interface ISmartphone {
  imagemDoSmartphone: Buffer | string
  model: string
  nomeDoCelular: string
  processador: string
  binarios: string
  androids: string
  downloadMode: string
  factoryReset: string
  unlockMethod: string
  allowBinary: string
  notAllowBinary: string
  flashRom: string
  program: string
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function checkDatabaseConnection() {
  try {
    prisma.$connect()
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
    app.quit() // Encerra o aplicativo se a conexão falhar
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exp.post(
  '/smartphones',
  upload.single('imagemDoSmartphone'),
  async (req: Request, res: Response) => {
    try {
      const {
        model,
        nomeDoCelular,
        processador,
        binarios,
        androids,
        downloadMode,
        factoryReset,
        unlockMethod,
        allowBinary,
        notAllowBinary,
        flashRom,
        program
      } = req.body as ISmartphone

      // Verifique se a imagem está presente
      if (!req.file) {
        return res.status(400).json({ error: 'A imagem do smartphone é obrigatória.' })
      }

      // O arquivo está disponível em req.file.buffer
      const imagemBuffer: Buffer = req.file.buffer

      // Criação do smartphone no banco de dados
      const novoSmartphone = await prisma.smartphone.create({
        data: {
          imagemDoSmartphone: imagemBuffer,
          model,
          nomeDoCelular,
          processador,
          binarios,
          androids,
          downloadMode,
          factoryReset,
          unlockMethod,
          allowBinary,
          notAllowBinary,
          flashRom,
          program
        }
      })

      res.status(201).json(novoSmartphone)
    } catch (error) {
      console.error('Erro ao criar smartphone:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)
exp.get('/files', async (_req, res) => {
  try {
    const smartphones = await prisma.smartphone.findMany()
    const response = smartphones.map((smartphone) => {
      if (smartphone.imagemDoSmartphone) {
        const imagemBase64 = smartphone.imagemDoSmartphone.toString('base64')
        return { ...smartphone, imagemDoSmartphone: `data:image/jpeg;base64,${imagemBase64}` }
      }
      return smartphone
    })
    res.status(200).json(response)
  } catch (error) {
    console.error('Erro ao buscar smartphones:', error)
  }
})
app.whenReady().then(() => {
  const dbPath = path.join(app.getPath('userData'), 'database.db')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message)
    } else {
      console.log('Conexão com o banco de dados estabelecida com sucesso no caminho:', dbPath)
    }
  })
  return db
})
function createWindow(): void {
  checkDatabaseConnection()
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  checkDatabaseConnection()
  electronApp.setAppUserModelId('com.electron')
  exp.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
