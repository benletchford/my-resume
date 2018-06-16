import { store } from 'react-easy-state'

import { decodeObject } from './utils.js'
import defaultData from './defaultData.js';

const DEFAULT_RESUME = {src: defaultData}

const dataStore = store(window.location.hash ? decodeObject(window.location.hash.substring(1)) : DEFAULT_RESUME)

export default dataStore
