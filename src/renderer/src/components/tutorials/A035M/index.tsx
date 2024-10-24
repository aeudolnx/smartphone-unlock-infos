/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styles from './styles.module.scss'
import Testpoint from '../../../assets/descriptionImgs/TestpointA035M.png'
import modoDownload from '../../../assets/descriptionImgs/test1.png'
import imagem2 from '../../../assets/descriptionImgs/test2.png'

export function TutorialA035M() {
  return (
    <main className={styles.Container} id="A035M">
      <h1>REMOVENDO CONTA SAMSUNG A03</h1>
      <span>Abrir o telefone e preprar para conectar o Testpoint na placa</span>
      <div className={styles.imgContainer}>
        <img src={Testpoint} alt="TestPoint" />
      </div>
      <span>
        Apos isso siga os passos da imagem abaixo, assim conseguirar remover a conta com sucesso.
      </span>
      <span>Primeiro Passo 1:</span>
      <div className={styles.imgContainer_2}>
        <img src={modoDownload} alt="Modo Download" />
      </div>
      <span>Segundo Passo: Escolha a marca SAMSUNG, após isso escolha o modelo A035M</span>
      <div className={styles.imgContainer_2}>
        <img src={imagem2} alt="Modo Download" />
      </div>
    </main>
  )
}
