import { useEffect, useState } from 'react';
import { TimeForSeconds } from '../../common/utils/date';
import { ITask } from '../../types/task';
import Button from '../button';
import Clock from './clock';
import style from './Timer.module.scss';

interface Props {
  selection: ITask | undefined;
  finalizarTask: () => void;
}

export default function Timer({ selection, finalizarTask }: Props) {
  const [timeInClock, setTimeInClock] = useState<number>();

  useEffect(() => {
    if (selection?.time) {
      setTimeInClock(TimeForSeconds(selection.time));
    }
  }, [selection]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTimeInClock(contador - 1);
        return regressiva(contador - 1);
      }
      finalizarTask();
    }, 1000);
  }
  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Clock timeInClock={timeInClock} />
      </div>
      <Button onClick={() => regressiva(timeInClock)}>Iniciar!</Button>
    </div>
  );
}
