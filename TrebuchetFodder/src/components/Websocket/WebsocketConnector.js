'use es6';

import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8082');
client.onopen = () => {
  console.log('WebSocket Client Connected');
};
client.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};
client.onmessage = (message) => {
  console.log('websocket message: ', message, JSON.parse(message.data));
};

const WebsocketConnector = ({}) => {
  useEffect(() => {
    client.send('Component has mounted');
  }, []);

  return <Fragment>WebSocket Time</Fragment>;
};

WebsocketConnector.propTypes = {};

export default WebsocketConnector;
