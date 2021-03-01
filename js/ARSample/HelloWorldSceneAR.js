'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroFlexView,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      subText1: "",
      subText2: ""
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        

        <ViroFlexView 
              style={styles.poiContainer}
              width={2} height={1} 
              position={[0, 0.0, -3.0]} 
              rotation={[0, 0, 0]} >
          <ViroFlexView style={styles.iconContainer} >
            <ViroText text="Sub" scale={[.5, .5, .5]} style={styles.subheading} /> 
          </ViroFlexView>
          
          <ViroFlexView style={styles.detailsContainer} >
            <ViroText text="Hotel hub horner" scale={[.5, .5, .5]} style={styles.heading} />
            <ViroText text="300m" scale={[.5, .5, .5]} style={styles.subheading} />
          </ViroFlexView>
      </ViroFlexView>

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!",
        subText1: "Some text 1",
        subText1: "Some text 2",
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  poiContainer: {
    flexDirection: 'row', 
    padding: .1, 
    flex: 1 
  },
  iconContainer: {
    backgroundColor: "#FF6565", 
    flex: 0.25,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    flex: 0.75,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    flexDirection: 'column', 
    alignContent: "flex-start",
    textAlign: 'left'
  },
  heading: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: '#000000', 
    flex: 1
  },
  subheading: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    flex: 1,
    color: 'rgba(0,0,0,0.7)'
  }
});

module.exports = HelloWorldSceneAR;