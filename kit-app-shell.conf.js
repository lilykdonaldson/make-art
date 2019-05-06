const DefineBuster = {
    'typeof define': `'undefined'`,
};

/**
 * @type {import('../kit-app-shell/packages/core/types').KashConfig}
 */
module.exports = {
    build: {
        resources: [
            './lib/vendor/ace/theme-dawn.js',
            './lib/vendor/ace/mode-coffee.js',
            './lib/vendor/ace/worker-coffee.js',
            './assets/button-icons/**/*',
            './assets/category-icons/**/*',
            './assets/challenges/**/*',
            './assets/layout/**/*',
            './assets/mischiefweek/**/*',
            './assets/pixelhack/**/*',
            './assets/sounds/**/*',
            './assets/summercamp/**/*',
            './assets/*.png',
            './www/css/**/*',
            './www/directive/**/*',
            './www/fonts/**/*',
            './www/locales/**/*',
            './www/partial/**/*',
            './www/*.html',
        ],
        moduleContext: {
            [require.resolve('./lib/vendor/ace/ace.js')]: 'window',
            [require.resolve('marked/marked.min.js')]: 'window',
            [require.resolve('color/color-0.4.1.js')]: 'window',
            [require.resolve('coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js')]: 'window'
        },
        replaces: [{
            // Special polymer patch. Fixes an issue for IE and Edge
            include: [require.resolve('@polymer/polymer/lib/legacy/polymer.dom.js')],
            values: {
                'observerHandle.disconnect();': 'observerHandle && observerHandle.disconnect();',
            },
        }, {
            include: [
                require.resolve('marked/marked.min.js'),
                require.resolve('coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js'),
            ],
            values: DefineBuster,
        }, {
            include: [require.resolve('color/color-0.4.1.js')],
            values: {
                ';Color =': ';window.Color =',
            }
        }, {
            // Angular is bad at guessing things, It tries to use the base href to do routing.
            // This forces angular to use the root as base for the app
            include: [require.resolve('angular/angular.js')],
            values: {
                'self.baseHref = function() {': 'self.baseHref = function() {return "/";',
            }
        }],
    },
    run: {
        replaces: [
            {
                include: [require.resolve('coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js')],
                values: {
                    'CoffeeScript})(this);': 'CoffeeScript})(window);'
                },
            },
            {
                include: [require.resolve('color/color-0.4.1.js')],
                values: {
                    ';Color =': ';window.Color =',
                }
            }
        ],
    },
    web: {
        port: 4000,
        build: {
            // Target platform for web builds
            targets: {
                chrome: 53,
                ios: 10,
                safari: 10,
            },
        },
    },
    uwp: {},
    test: {},
};
