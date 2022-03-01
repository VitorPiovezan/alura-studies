import { spawn } from 'child_process';
import { ITask } from '../../../types/task';
import style from '../List.module.scss';
interface Props extends ITask {
  selectTask: (taskSelected: ITask) => void;
}

export default function Item({
  task,
  time,
  selecionado,
  completado,
  id,
  selectTask,
}: Props) {
  return (
    <li
      className={`${style.item} ${selecionado && style.itemSelecionado} ${
        completado && style.itemCompletado
      } `}
      onClick={() =>
        !completado && selectTask({ task, time, selecionado, completado, id })
      }
    >
      <h3>{task}</h3>
      <span>{time}</span>
      {completado && (
        <span className={style.concluido} aria-label="tarefa completada"></span>
      )}
    </li>
  );
}
