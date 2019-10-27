import * as cluster from 'cluster';
import * as os from 'os';
import { bootstrap } from './bootstrap';


if (cluster.isMaster) {
  console.log('Master starting...');
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
  }
} else {
  console.log('Fork starting...');
  bootstrap();
}


cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!')
  cluster.fork()
});