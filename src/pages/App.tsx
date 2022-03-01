import React, { useState } from 'react';
import Form from '../components/form';
import List from '../components/list';
import Timer from '../components/timer';
import { ITask } from '../types/task';
import style from './App.module.scss';

function App() {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [selection, setSelection] = useState<ITask>();

  function selectTask(taskSelected: ITask) {
    setSelection(taskSelected);
    setTasks(oldTasks =>
      oldTasks.map(task => ({
        ...task,
        selecionado: task.id === taskSelected.id ? true : false,
      }))
    );
  }

  function finalizarTask() {
    if (selection) {
      setSelection(undefined);
      setTasks(oldTasks =>
        oldTasks.map(task => {
          if (task.id === selection.id) {
            return {
              ...task,
              selecionado: false,
              completado: true,
            };
          }
          return task;
        })
      );
    }
  }
  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks} />
      <List tasks={tasks} selectTask={selectTask} />
      <Timer selection={selection} finalizarTask={finalizarTask} />
    </div>
  );
}

export default App;
