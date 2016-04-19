var cookList = Cooks.findOne({});

if (!cookList || !cookList.value || cookList.value.length === 0) {
  Cooks.remove({});
  Cooks.insert({ value: ['thomas', 'ian', 'jeff', 'adriana', 'dane']})
}
