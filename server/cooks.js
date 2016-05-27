import Cooks from '../lib/collections/cooks';

export default function rebuildCooks () {
  var cookList = Cooks.findOne({});

  if (!cookList || !cookList.value || cookList.value.length === 0) {
    console.log('rebuilding cooks')
    Cooks.remove({});
    Cooks.insert({ value: ['thomas', 'ian', 'alex', 'jeff', 'adriana', 'dane']})
  }
}
