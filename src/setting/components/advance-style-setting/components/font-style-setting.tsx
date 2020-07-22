/** @jsx jsx */
import {React, jsx, Immutable, ThemeVariables} from 'jimu-core';
import {UnitTypes, LinearUnit, IMTextFontStyle, FontStyleKeys} from 'jimu-ui';
import {InputUnit} from 'jimu-ui/style-setting-components';
import {RichTextFormatKeys} from 'jimu-ui/rich-text-editor';
import {ThemeColorPicker} from 'jimu-ui/color-picker';
import {FontStyle} from 'jimu-ui/setting-components';


interface Props{
  text: IMTextFontStyle;
  appTheme: ThemeVariables;
  onChange: (text: IMTextFontStyle) => void;
}

export default class FontStyleSetting extends React.PureComponent<Props> {
  units = [UnitTypes.PIXEL];
  onSizeChange = (size: LinearUnit) => {
    this.changeText(FontStyleKeys.Size, size.distance + size.unit);
  }

  onFontChange = (k: Partial<FontStyleKeys>, v: any) => {
    this.changeText(k, v);
  }

  onColorChange = (color: string) => {
    this.changeText(FontStyleKeys.Color, color);
  }

  changeText = (k: Partial<FontStyleKeys>, v: any) => {
    const text = this.props.text ? this.props.text.set(k, v) : (Immutable({[k]: v}) as IMTextFontStyle);
    this.props.onChange(text);
  }

  render() {
    const text = this.props.text || {};

    return (
      <div className="w-100 d-flex justify-content-between icon-size-font-style-setting">
        <div className="font-size-container">
          <InputUnit units={this.units} value={{distance: parseFloat(text[RichTextFormatKeys.Size]), unit: UnitTypes.PIXEL}} onChange={this.onSizeChange}/>
        </div>
        <div className="font-style-container">
          <FontStyle {...text} onFontChange={this.onFontChange}></FontStyle>
        </div>
        <div>
          <ThemeColorPicker specificTheme={this.props.appTheme} value={text[RichTextFormatKeys.Color]} onChange={this.onColorChange}/>
        </div>
      </div>
    );
  }
}
