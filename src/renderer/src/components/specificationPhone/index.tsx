/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styles from './styles.module.scss'
import { Detalhes } from '../../app/App'
interface PhoneProps {
  filter: Detalhes[]
}
export function SpecificationPhone({ filter }: PhoneProps) {
  return (
    <main className={styles.Container}>
      {filter.length === 0 ? (
        <div className={styles.WelcomeContainer}>
          <h1>Bem-vindo! Para ver os detalhes dos celulares,</h1>
          <h1>digite o modelo desejado na barra de pesquisa.</h1>
          <h1>não se esqueça de incluir todas as informações relevantes.</h1>
        </div>
      ) : (
        filter.map((data) => {
          return (
            <ul className={styles.ulContainer} key={data.model}>
              <div className={styles.imgContainer}>
                <img src={data.imagemDoSmartphone} alt={data.model} />
              </div>
              <li>{data.nomeDoCelular}</li>
              <li>Modelo: {data.model}</li>
              <li className={styles.process}>Processador: {data.processador}</li>
              <li>Binários disponiveis: {data.binarios}</li>
              <li>Androids disponiveis: {data.androids}</li>
              <li className={styles.methods}>Modo Download (Desligado): {data.downloadMode}</li>
              <li className={styles.methods}>
                Formatação de fábrica (Desligado): {data.factoryReset}
              </li>
              <li>
                Consultar IMEI:{' '}
                <a
                  href="https://www.consultaaparelhoimpedido.com.br/public-web/home?cid=590675"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.consultaaparelhoimpedido.com.br/public-web/home?cid=590675
                </a>
              </li>
              <li className={styles.download}>Métodos de remoção: {data.unlockMethod}</li>
              <li>Binários removíveis: {data.allowBinary}</li>
              <li>Binários não removíveis: {data.notAllowBinary}</li>
              <li>Precisa diminuir rom: {data.flashRom}</li>
              <li>Programa para remover conta: {data.program}</li>
              <li>Programa para remover conta: UnlockTool</li>
              <li>Programa para remover conta: UnlockTool</li>
            </ul>
          )
        })
      )}
    </main>
  )
}
