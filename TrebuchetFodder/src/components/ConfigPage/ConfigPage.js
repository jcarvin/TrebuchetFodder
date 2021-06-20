'use es6';

import React, { useCallback, useEffect, useState } from 'react';
import Authentication from '../../util/Authentication/Authentication';

import './Config.css';

const ConfigPage = ({}) => {
  const Auth = new Authentication();
  const twitch = window.Twitch ? window.Twitch.ext : null;
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isMod, setIsMod] = useState(false);
  const [cohorts, setCohorts] = useState('');

  const contextUpdate = useCallback((context, delta) => {
    if (delta.includes('theme')) {
      setTheme(context.theme);
    }
  }, []);

  const setConfigLocalState = useCallback(() => {
    // twitch's configuration service is not enabled by default.
    // if you haven't already, you will need to go to the extension
    // settings in the twitch developer console and enable the configuration service
    if (twitch.configuration.broadcaster) {
      try {
        // Parsing the array saved in broadcaster content
        var config = JSON.parse(twitch.configuration.broadcaster.content);

        // Checking the content is an object
        if (typeof config === 'object') {
          // Updating the value of the options array to be the content from config

          console.log('set config?', config);
          setCohorts(config.cohorts);
        } else {
          console.log('Invalid config');
        }
      } catch (e) {
        console.log('Invalid config');
      }
    }
  }, []);

  useEffect(() => {
    if (twitch) {
      twitch.onAuthorized((auth) => {
        Auth.setToken(auth.token, auth.userId);
        setIsMod(Auth.isModerator());
        if (loading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.
          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          setLoading(false);
        }
      });

      twitch.configuration.onChanged(() => {
        // Checks if configuration is defined
        setConfigLocalState();
      });

      setConfigLocalState();

      twitch.onContext((context, delta) => {
        contextUpdate(context, delta);
      });
    }
  }, []);

  const updateConfig = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      twitch.configuration.set(
        'broadcaster',
        '0.0.1', // will need to be set dynamically
        JSON.stringify({ cohorts })
      );
    },
    [cohorts]
  );

  return !loading && isMod ? (
    <div className="Config">
      <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
        Please Provide a list of channel names that you intend to coordinate
        with separated by commas
        <form value={cohorts} onSubmit={updateConfig}>
          <label>
            Cohorts: 
            <input
              type="text"
              name="Cohorts"
              value={cohorts}
              onChange={(e) => {
                setCohorts(e.target.value);
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  ) : (
    <div className="Config">
      <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
        Loading....
      </div>
    </div>
  );
};

ConfigPage.propTypes = {};

export default ConfigPage;
