import Cooks from '../lib/collections/cooks';

export default function rebuildCooks () {
  var cookList = Cooks.findOne({});

  console.log(JSON.stringify(cookList));
  if (!cookList || !cookList.value || cookList.value.length === 0) {
    Cooks.remove({});
    Cooks.insert({ value: ['thomas', 'ian', 'alex', 'jeff', 'adriana', 'dane']})
  }
}
