/* 3rd party libraries */
import { isEqual } from 'lodash';

const defaultOptions = {
    shutdownCountDown: 5,
    shutdownTime: 30000,
    autoShutdown: true
};

function *gen(time, callback, options = {}) {
    options = {
        ...defaultOptions,
        ...options
    };
    let alive = true;
    let countDown = 0;
    let currentCallback = callback;
    let currentData;
    let lastData = currentData;
    const recursiveTimeout = () => {
        return setTimeout(
            () => {
                if (!isEqual(currentData, lastData)) {
                    lastData = currentData;
                    currentCallback(currentData);
                }
                recursiveTimeout();
            },
            time,
        );
    };

    let currentTimer = recursiveTimeout();

    const {
        shutdownCountDown,
        shutdownTime,
        autoShutdown
    } = options;

    let currentShutdownTime = shutdownTime;

    const generateTimer = () => setTimeout(
        () => { currentTimer && clearTimeout(currentTimer); alive = false; },
        currentShutdownTime
    );

    let shutdownTimer = autoShutdown && generateTimer();

    while(alive) {
        yield (data = currentData, newCallback, newShutdownTime, stop = false) => {
            try {                
                if (stop) {
                    alive = false;
                    currentTimer && clearTimeout(currentTimer);
                    shutdownTimer && clearTimeout(shutdownTimer);
                } else {
                    alive = !data && autoShutdown? (++countDown) < shutdownCountDown : true;
                    shutdownTimer && clearTimeout(shutdownTimer);
                    currentCallback = newCallback || currentCallback;
                    currentShutdownTime = newShutdownTime || currentShutdownTime;

                    currentData = data;

                    shutdownTimer = autoShutdown && generateTimer();
                }
            } catch(error) {
                alive = false;
                currentTimer && clearTimeout(currentTimer);
                shutdownTimer && clearTimeout(shutdownTimer);
            } finally {
                return alive;
            }
        };
    }

    while(true) yield () => false;
}

export default (time, callback, options) => {
    const generator = gen(time, callback, options);

    return {
        debounce: (...params) => generator.next().value(...params),
        clearDebounce: () => generator.next().value(null, null, null, true)
    }
};