import React, { Component } from 'react';

import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import beautify_js from 'js-beautify'

import { encodeObject } from './utils.js'
import store from './store.js'

class Editor extends Component {
  render() {
    var options = {
			lineNumbers: true,
      mode: {name: 'javascript', json: true}
		}
    var jsonStr = beautify_js(JSON.stringify(store.src), {
      indent_size: 2
    })

    return (
      <div id="editor" style={{height: '100%', width: '100%'}}>
        <CodeMirror value={jsonStr} options={options} onChange={this.onChange} />
      </div>
    );
  }

  onChange(newJsonStr) {
    try {
        store.src = JSON.parse(newJsonStr);
        window.location.hash = encodeObject(store)
    } catch (e) {
        return false;
    }
  }
}

export default Editor;
