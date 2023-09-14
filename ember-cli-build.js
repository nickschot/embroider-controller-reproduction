'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { V1Addon } = require('@embroider/compat');
const buildFunnel = require('broccoli-funnel');
const cloneDeep = require('lodash/cloneDeep');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    compatAdapters: new Map([
      // ember-swiper6 provides an application controller for no reason, we remove it here.
      ['ember-swiper6', RemoveApplicationControllerCompatAdapter],
    ]),
  });
};

class RemoveApplicationControllerCompatAdapter extends V1Addon {
  get v2Tree() {
    return buildFunnel(super.v2Tree, {
      exclude: [
        '_app_/controllers/application.js',
        'controllers/application.js',
      ],
    });
  }
  get packageMeta() {
    let meta = super.packageMeta;
    if (meta['app-js']) {
      meta = cloneDeep(meta);
      delete meta['app-js']['./controllers/application.js'];
    }
    return meta;
  }
}
