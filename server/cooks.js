import Cooks from '../lib/collections/cooks';
import {CANNONICAL_COOKS} from '../lib/cooks-list'

export default function rebuildCooks () {
  var cookList = Cooks.findOne({});

  if (!cookList || !cookList.value || cookList.value.length === 0) {
    console.log('rebuilding cooks')
    Cooks.remove({});
    Cooks.insert({ value: CANNONICAL_COOKS})
  }
}
