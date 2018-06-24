import React, { Component } from 'react';
import { view } from 'react-easy-state'
import SplitPane from 'react-split-pane'

import Editor from './Editor.js'
import Viewer from './Viewer.js'

class App extends Component {
  render() {
    var jsx = undefined
    if(this.props.mode === 'display') {
      jsx = (
        <div className="App">
          <Viewer displayOnly={true}/>
          <Viewer printOnly={true}/>
        </div>
      );
    } else {
      jsx = (
        <div className="App">
          <Viewer printOnly={true}/>
          <SplitPane split="vertical" defaultSize={'33%'}>
            <Editor displayOnly={true}/>
            <Viewer />
          </SplitPane>
        </div>
      );
    }

    return jsx
  }
}

export default view(App);
