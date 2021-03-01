'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

/*
 * TODO: Add your API key below!!
 */
var apiKey = "YOUR_API_KEY_HERE";
 

var arScenes = {
  'ARSimpleSample': require('./js/ARSample/HelloWorldSceneAR.js'),
  'ARPhysicsSample': require('./js/ARPhysicsSample/BasicPhysicsSample.js'),
  'ARCarDemo' : require('./js/ARCarDemo/ARCarDemo.js'),
  'ARPosterDemo' : require('./js/ARPosterDemo/ARPosterDemo.js'),
  'BusinessCard' : require('./js/ARBusinessCard/BusinessCard.js'),
  'ARLocation' : require('./js/HelloWorldSceneAR.js')
}

var showARScene = true;

var ViroCodeSamplesSceneNavigator = createReactClass({
  render: function() {
 
      return (
        <ViroARSceneNavigator
          initialScene={{
            scene: arScenes['ARSimpleSample'],
          }}
          apiKey={apiKey} />
        ); 
  }
});
 
module.exports = ViroCodeSamplesSceneNavigator;
