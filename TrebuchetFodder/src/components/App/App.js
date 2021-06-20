'use es6';

import React, { useCallback, useEffect, useState } from 'react';
import WebsocketConnector from '../Websocket/WebsocketConnector';
import './App.css';
import Authentication from '../../util/Authentication/Authentication';

const App = ({}) => {
  const Auth = new Authentication();
  const twitch = window.Twitch ? window.Twitch.ext : null;
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isVisible, setIsVisible] = useState(true);

  const contextUpdate = useCallback((context, delta) => {
    if (delta.includes('theme')) {
      setTheme(context.theme);
    }
  }, []);

  const visibilityChanged = useCallback((isVisible) => {
    setIsVisible(isVisible);
  }, []);

  useEffect(() => {
    if (twitch) {
      twitch.onAuthorized((auth) => {
        Auth.setToken(auth.token, auth.userId);
        if (loading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          setLoading(false);
        }
      });

      twitch.listen('broadcast', (target, contentType, body) => {
        twitch.rig.log(
          `New PubSub message!\n${target}\n${contentType}\n${body}`
        );
        // now that you've got a listener, do something with the result...

        // do something...
      });

      twitch.onVisibilityChanged((isVisible, _c) => {
        visibilityChanged(isVisible);
      });

      twitch.onContext((context, delta) => {
        console.log('context update', context, delta);
        contextUpdate(context, delta);
      });
    }

    return () => {
      if (twitch) {
        twitch.unlisten('broadcast', () => console.log('unlistened'));
      }
    };
  }, []);

  return !loading && isVisible ? (
    <div className="App">
      <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
        <p>Hello world!</p>
        {/* just leaving the stuff below commented out for reference. Some of those varianle are really good to know. */}
        {/* <p>My token is: {Auth.state.token}</p>
            <p>My opaque ID is Auth.getOpaqueId()}.</p>
            <div>
              {Auth.isModerator() ? (
                <p>
                  I am currently a mod, and here's a special mod button{' '}
                  <input value="mod button" type="button" />
                </p>
              ) : (
                'I am currently not a mod.'
              )}
            </div>
            <p>
              I have{' '}
              {Auth.hasSharedId()
                ? `shared my ID, and my user_id is ${Auth.getUserId()}`
                : 'not shared my ID'}
              .
            </p> */}
        <p>Trebuchet Fodder!!!</p>
        <WebsocketConnector />
      </div>
    </div>
  ) : (
    <div className="App"></div>
  );
};

App.propTypes = {};

export default App;
