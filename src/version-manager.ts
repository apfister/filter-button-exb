import { BaseVersionManager } from 'jimu-core';

class VersionManager extends BaseVersionManager{
  versions = [{
    version: '1.0.0',
    description: 'The first release.',
    upgrader: (oldConfig) => {
      let newConfig = oldConfig;

      if(newConfig.getIn(['styleConfig', 'name'])){
        newConfig = newConfig.set('styleConfig', newConfig.styleConfig.without('name'));
      }

      if(newConfig.getIn(['styleConfig', 'customStyle'])){
        newConfig = newConfig.set('styleConfig', newConfig.styleConfig.without('customStyle'));
      }

      if(newConfig.getIn(['styleConfig', 'themeStyle', 'quickStyleType'])){
        newConfig = newConfig.setIn(['styleConfig', 'themeStyle'], {quickStyleType: newConfig.styleConfig.themeStyle.quickStyleType});
      }

      newConfig = newConfig.setIn(['styleConfig', 'useCustom'], false);

      return newConfig;
    }
  }]
}

export const versionManager = new VersionManager();