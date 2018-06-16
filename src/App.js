import React, { Component } from 'react';
import { view } from 'react-easy-state'
import SplitPane from 'react-split-pane'

import Editor from './Editor.js'
import Viewer from './Viewer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Viewer printOnly={true}/>
        <SplitPane split="vertical" defaultSize={'33%'}>
            <Editor />
            <Viewer />
        </SplitPane>
      </div>
    );
  }
}

export default view(App);
