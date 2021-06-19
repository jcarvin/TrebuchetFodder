'use es6';

import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8082');
client.onopen = () => {
  console.log('WebSocket Client Connected');
};
client.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

const WebsocketConnector = ({}) => {
  const [displayText, setDisplayText] = useState('Websocket Time!');

  useEffect(() => {
    client.onmessage = handleWebsocketMessages;
    client.send('Component has mounted');
  }, []);

  const handleWebsocketMessages = useCallback((message) => {
    const socketMessage = JSON.parse(message.data);
    console.log('websocket message: ', socketMessage);
    switch (socketMessage.type) {
      case 'msg':
        setDisplayText(socketMessage.data);
        return;
      default:
        return;
    }
  }, []);

  return <Fragment>{displayText}</Fragment>;
};

WebsocketConnector.propTypes = {};

export default WebsocketConnector;
