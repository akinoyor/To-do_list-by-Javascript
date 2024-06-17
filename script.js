// ページが読み込まれたときにローカルストレージからタスクを読み込む
document.addEventListener('DOMContentLoaded', (event) => {
  loadTasks();
});

//追加ボタンクリックで下記が発火
function addTask() {
  const taskInput = document.getElementById('taskInput');//taskInputから要素取り込み
  const task = taskInput.value;//taskInputの値の取り出し
  if (task === '') return;//空欄なら終わり

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');//<il></il>を作る
  li.textContent = task;//<il>task内容</il>　taskをテキスト内容として入れる

  const deleteButton = document.createElement('button');//<button></button>作成
    deleteButton.textContent = '削除';//<button>削除<button>
    deleteButton.onclick = () => {//クリックされたときの動作
      taskList.removeChild(li);//taskListの中のilを削除
      saveTasks();//taskListの更新
    };

  li.appendChild(deleteButton);//<il>task <button>delete</button> </il> il内の　taskの末尾にボタン追加
  taskList.appendChild(li);//上で作ったilをtasklistの最後に追加
  taskInput.value = '';//入力欄のリセット
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById('taskList');//taskListの要素取入れ
  const tasks = [];
  for (let i = 0; i < taskList.children.length; i++) {//ilの数だけ回す
      tasks.push(taskList.children[i].firstChild.textContent);//taskList(ul)のi番目の子要素(il)の一個目の子要素のtextをtasksに入れる
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));//ローカルストレージに作った配列をJSON型で記録する
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));//ローカルストレージのtasksを取得し　Json型から戻す？
  if (tasks) {
    const taskList = document.getElementById('taskList');
    for (const task of tasks) {//tasksの用ををtaskと定義
      const li = document.createElement('li');
      li.textContent = task;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButton.onclick = () => {
        taskList.removeChild(li);
        saveTasks();
      };
      
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    }
  }
}